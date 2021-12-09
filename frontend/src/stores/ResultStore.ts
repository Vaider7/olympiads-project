import {action, makeObservable, observable} from 'mobx';
import request from './utils';
import {Loading} from '../enums';
import {Olympiad, Result} from '../types';
import RouterStore from './RouterStore';


export default class ResultStore {
  @observable loadingStatus = Loading.PENDING;

  RouterStore!: RouterStore;
  olympiad!: Olympiad

  results!: Result[];

  constructor (store1: RouterStore) {
    makeObservable(this);

    this.RouterStore = store1;
    this.loadOlympiad();
  }

  @action changeLoadingStatus = (val: Loading): void => {
    this.loadingStatus = val;
  }

  loadOlympiad = async (): Promise<void> => {
    const {olympiadId} = this.RouterStore.params;

    let result = await request('get', `/api/olympiads/${olympiadId}`);

    if (result.err) {
      this.changeLoadingStatus(Loading.ERROR);
      window.notify('err', result.err);

      return;
    }

    this.olympiad = result.res?.data as Olympiad;

    result = await request('get', `/api/users-olympiads/get-result/${olympiadId}`);

    if (result.err) {
      this.changeLoadingStatus(Loading.ERROR);
      window.notify('err', result.err);

      return;
    }

    this.results = result.res?.data as Result[];

    setTimeout(() => {
      this.changeLoadingStatus(Loading.DONE);
    }, 700);
  }
}