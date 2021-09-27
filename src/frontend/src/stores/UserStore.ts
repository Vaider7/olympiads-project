import {action, makeObservable, observable} from 'mobx';
import axios from 'axios';
import {Loading} from '../enums';

export default class UserStore {
  @observable loadingStatus = Loading.PENDING;
  @observable isLogged = false;
  @observable user: Record<string, unknown> = {}


  constructor () {
    makeObservable(this);

    if (localStorage.getItem('access_token')) {
      this.checkLogged();
    }
    this.loadingStatus = Loading.DONE;
  }

  @action changeIsLogged = (value: boolean): void => {
    this.isLogged = value;
  }

  @action setUser = (user: Record<string, unknown>): void => {
    this.user = user;
  }

  @action changeLoadingStatus = (status: Loading): void => {
    this.loadingStatus = status;
  }

  checkLogged = async (): Promise<void> => {
    try {
      const result = await axios.post(
        '/api/user/get',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        }
      );

      if (result) {
        this.setUser(result.data as Record<string, unknown>);
        this.changeIsLogged(true);
        this.changeLoadingStatus(Loading.DONE);
      } else {
        this.changeIsLogged(false);
        this.changeLoadingStatus(Loading.DONE);
      }
    } catch (e: unknown) {
      this.changeIsLogged(false);
      this.changeLoadingStatus(Loading.ERROR);
    }
  }
}