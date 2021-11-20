import {action, makeObservable, observable} from 'mobx';
import axios from 'axios';
import {Loading} from '../enums';

export default class UserStore {
  @observable loadingStatus = Loading.PENDING;
  @observable isLogged = false;
  user: Record<string, unknown> = {}


  constructor () {
    makeObservable(this);

    if (localStorage.getItem('access_token')) {
      setTimeout(this.checkLogged, 700);
    } else {
      this.changeIsLogged(false);
      this.changeLoadingStatus(Loading.DONE);
    }
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

  private checkLogged = async (): Promise<void> => {
    const token = localStorage.getItem('access_token');
    const headerValue = `Bearer ${token}`;
    try {
      const result = await axios.get(
        '/api/users/get',
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: headerValue
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