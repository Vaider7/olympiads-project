import {action, makeObservable, observable, when} from 'mobx';
import {Loading, OlympiadStatus} from '../enums';
import request from './utils';
import {Olympiad} from '../types';
import UserStore from './UserStore';
import RouterStore from './RouterStore';


export default class IndexStore {
  UserStore!: UserStore;
  RouterStore!: RouterStore;


  @observable loadingStatus = Loading.PENDING;
  @observable loadingRegistered = Loading.PENDING;
  @observable selectedOlympiad: Olympiad | undefined;

  olympiads: Olympiad[] = [];
  registeredOlympiads: number[] = [];
  finishedOlympiad: number[] = [];

  constructor (store: UserStore, store2: RouterStore) {
    makeObservable(this);

    this.UserStore = store;
    this.RouterStore = store2;

    this.loadOlympiads();

    when(() => this.UserStore.isLogged, this.loadUserOlympiads);
  }

  @action changeLoadingStatus = (status: Loading): void => {
    this.loadingStatus = status;
  }

  @action setOlympiadDetails = (id: number | undefined): void => {
    if (id === undefined) {
      this.selectedOlympiad = undefined;
    }
    this.selectedOlympiad = this.olympiads.find((olympiad) => olympiad.id === id);
  }

  @action changeLoadingRegistered = (val: Loading): void => {
    this.loadingRegistered = val;
  }

  setOlympiads = (olympiads: Olympiad[]): void => {
    this.olympiads = olympiads;
  }

  loadOlympiads = async (): Promise<void> => {
    const result = await request('get', '/api/olympiads/get');

    const olympiads = result.res?.data as Olympiad[];

    for (const olympiad of olympiads) {
      const start = new Date(olympiad.start);
      const end = new Date(olympiad.end);
      const {duration} = olympiad;

      const time = new Date();

      olympiad.formattedStart =
        `${String(start.getDate()).length === 1 ? String(`0${start.getDate()}`) : start.getDate()}.${String(start.getMonth()).length === 1 ? String(`0${start.getMonth()}`) :
          start.getMonth()} в ${start.getHours()}:${start.getMinutes()}`;
      olympiad.formattedEnd =
        ` ${String(end.getDate()).length === 1 ? String(`0${end.getDate()}`) : end.getDate()}.${String(end.getMonth()).length === 1 ? String(`0${end.getMonth()}`) :
          end.getMonth()} в ${end.getHours()}:${end.getMinutes()}`;
      olympiad.formattedDuration = `${Math.floor(duration / 60)} ч ${duration % 60 === 0 ? '' : `${duration % 60} мин`}`;

      if (time < start) {
        olympiad.status = OlympiadStatus.WAITING_START;
      } else if (time > start && time < end) {
        olympiad.status = OlympiadStatus.IN_PROGRESS;
      } else if (time > end) {
        olympiad.status = OlympiadStatus.FINISHED;
      }
    }

    this.setOlympiads(olympiads);

    this.changeLoadingStatus(Loading.DONE);
  }

  loadUserOlympiads = async (): Promise<void> => {
    let result = await request('get', '/api/users/get-registered');
    this.registeredOlympiads = result.res?.data;

    result = await request('get', '/api/olympiads/get-finished');
    this.finishedOlympiad = result.res?.data;

    setTimeout(() => {
      this.changeLoadingRegistered(Loading.DONE);
    }, 700);
  }

  @action takePart = async (): Promise<void> => {
    this.changeLoadingStatus(Loading.PENDING);

    const result = await request('post', '/api/users-olympiads/register',
      {olympiad_id: this.selectedOlympiad?.id});

    if (result.err) {
      window.notify('err', result.err);
      this.setOlympiadDetails(undefined);
      this.changeLoadingStatus(Loading.DONE);

      return;
    }

    this.registeredOlympiads.push(this.selectedOlympiad?.id as number);
    this.setOlympiadDetails(undefined);
    this.changeLoadingStatus(Loading.DONE);
  }

  @action displayShit = (olympiad: Olympiad): string | undefined => {
    if ((olympiad.status === OlympiadStatus.WAITING_START || olympiad.status === OlympiadStatus.IN_PROGRESS) &&
      !this.registeredOlympiads.includes(olympiad.id)) {

      return 'Участвовать';
    }

    if (this.finishedOlympiad.includes(olympiad.id)) {
      return 'Посмотреть результат';
    }

    if (olympiad.status === OlympiadStatus.FINISHED) {
      return 'Завершена';
    }

    if (olympiad.status === OlympiadStatus.IN_PROGRESS) {
      return 'Начать';
    }

    if (olympiad.status === OlympiadStatus.WAITING_START) {
      return 'Ожидание старта';
    }
  }

  startOlympiad = async (id: number): Promise<void> => {
    await request('patch', `/api/users-olympiads/start?olympiad_id=${id}`);
    this.RouterStore.navigate(`/olympiads/${id}`);
  }

  checkResult = (olympiadId: number): void => {
    this.RouterStore.navigate(`/olympiads/check-result/${olympiadId}`);
  }
}