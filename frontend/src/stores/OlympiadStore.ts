import {action, makeObservable} from 'mobx';
import RouterStore from './RouterStore';
import request from './utils';


export default class OlympiadStore {
  RouterStore!: RouterStore;

  taskIds!: number[];

  constructor (store: RouterStore) {
    // makeObservable(this);

    this.RouterStore = store;
    this.loadOlympiad();
  }

  loadOlympiad = async (): Promise<void> => {
    const {olympiadId} = this.RouterStore.params;

    const result = await request('get', `/api/olympiads/${olympiadId}`);

    if (result.err) {
      this.RouterStore.navigate('/');
      window.notify('err', result.err);

      return;
    }

    const tasksIds = await request('post', '/api/olympiads/get-tasks-ids', 1);

    this.taskIds = tasksIds.res?.data as number[];

    const currentTask = this.RouterStore.getParams('taskId');

    if (!currentTask) {
      this.RouterStore.setParams(`taskId=${this.taskIds[0]}`);
    }

  }
}