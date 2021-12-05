import {action, makeObservable, observable} from 'mobx';
import RouterStore from './RouterStore';
import request from './utils';
import {Olympiad, Task, Tuple} from '../types';
import {Loading, TaskType} from '../enums';
import {ChangeEvent} from 'react';


export default class OlympiadStore {
  olympiad!: Olympiad;

  RouterStore!: RouterStore;

  taskIdsNames!: Tuple<number, string>[];

  currentTask!: Task;

  err!: string;

  firstRender = true;

  timeout!: NodeJS.Timeout;


  @observable loadingStatus = Loading.PENDING;

  @observable radioValue = '1';

  @observable checkboxesValues: Record<string, boolean> = {};

  @observable typedAnswer = '';

  @observable isCloseDialog = false;

  constructor (store: RouterStore) {
    makeObservable(this);

    this.RouterStore = store;
    this.loadOlympiad();
  }

  @action toggleCloseDialog = (): void => {
    this.isCloseDialog = !this.isCloseDialog;
  }

  @action changeTypedAnswer = (e: ChangeEvent<HTMLInputElement>): void => {
    this.typedAnswer = e.target.value;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(action(() => {
      this.giveAnswer([this.typedAnswer]);
    })
    , 400);
  };

  @action changeCheckboxesValues = (e: ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    this.checkboxesValues = {...this.checkboxesValues, [e.target.name]: checked};
    const answer: string[] = [];
    for (const elem in this.checkboxesValues) {
      if (this.checkboxesValues[elem]) {
        answer.push(elem);
      }
    }
    this.giveAnswer(answer);
  }

  @action changeRadioValue = (e: ChangeEvent<HTMLInputElement>): void => {
    this.radioValue = e.target.value;
    this.giveAnswer([this.radioValue]);
  }

  @action loadOlympiad = async (): Promise<void> => {
    const {olympiadId} = this.RouterStore.params;

    let result = await request('get', `/api/olympiads/${olympiadId}`);

    if (result.err) {
      this.err = result.err;
      action(() => this.loadingStatus = Loading.ERROR)();

      return;
    }

    this.olympiad = result.res?.data as Olympiad;

    const tasksIds = await request('post', '/api/olympiads/get-tasks-ids-names', 1);

    this.taskIdsNames = tasksIds.res?.data as Tuple<number, string>[];

    const taskIdParam = this.RouterStore.getParams('taskId');

    if (!taskIdParam) {
      this.RouterStore.setParams(`taskId=${this.taskIdsNames[0][0]}`);
      result = await request('get', `/api/tasks/${this.taskIdsNames[0][0]}`);
    } else {
      result = await request('get', `/api/tasks/${taskIdParam}`);
    }

    if (result.err) {
      this.err = result.err;
      action(() => this.loadingStatus = Loading.ERROR)();

      return;
    }


    this.currentTask = result.res?.data as Task;

    if (this.currentTask.answers && this.currentTask.taskType === TaskType.MULTI) {

      for (const elem of this.currentTask.answers) {
        action(() => this.checkboxesValues = {...this.checkboxesValues, [elem.no]: false})();
      }
    }


    await this.getGivenAnswer();
    setTimeout(action(() => this.loadingStatus = Loading.DONE), 700);
  }

  @action getGivenAnswer = async (): Promise<void> => {
    const result = await request('post', '/api/users-olympiads/get-given-answer',
      {olympiad_id: this.olympiad.id, task_id: this.currentTask.id});

    const userAnswer = result.res?.data.answer as string[] | undefined;
    if (userAnswer?.length) {
      switch (this.currentTask.taskType) {
        case TaskType.TYPED:
          action(() => [this.typedAnswer] = userAnswer)();
          break;

        case TaskType.ONE:
          action(() => [this.radioValue] = userAnswer)();
          break;

        case TaskType.MULTI:
          for (const elem of userAnswer) {
            action(() => this.checkboxesValues = {...this.checkboxesValues, [elem]: true})();
          }
      }
    }
  }

  @action changeCurrentTask = async (id: number): Promise<void> => {
    if (this.currentTask.id === id) {

      return;
    }
    this.loadingStatus = Loading.PENDING;

    const result = await request('get', `/api/tasks/${id}`);

    if (result.err) {
      this.err = result.err;
      action(() => this.loadingStatus = Loading.ERROR)();

      return;
    }
    this.currentTask = result.res?.data as Task;

    if (this.currentTask.answers && this.currentTask.taskType === TaskType.MULTI) {

      for (const elem of this.currentTask.answers) {
        action(() => this.checkboxesValues = {...this.checkboxesValues, [elem.no]: false})();
      }
    }

    await this.getGivenAnswer();
    this.RouterStore.setParams(`taskId=${id}`);
    setTimeout(action(() => this.loadingStatus = Loading.DONE), 700);
  }

  @action endOlympiad = async (): Promise<void> => {
    this.loadingStatus = Loading.PENDING;

    await request('put', '/api/users-olympiads/end-olympiad',
      {olympiad_id: this.olympiad.id});

    this.RouterStore.navigate('/');
    window.notify('success', 'Олимпиада завершена');

  }

  nextTask = async (): Promise<void> => {
    const tasksIds = this.taskIdsNames.map((tuple) => tuple[0]);
    if (tasksIds.includes(this.currentTask.id + 1)) {
      await this.changeCurrentTask(this.currentTask.id + 1);
    }
  }

  giveAnswer = async (answer: string[]): Promise<void> => {
    const data = {olympiad_id: this.olympiad.id, task_id: this.currentTask.id, answer};

    const result = await request('post', '/api/users-olympiads/give-answer', data);

    if (result.err) {
      window.notify('err', result.err);
    }
  }

  renderCheckboxes = (no: number): boolean | undefined => {
    if (this.firstRender) {
      return this.checkboxesValues[no];
    }
  }
}