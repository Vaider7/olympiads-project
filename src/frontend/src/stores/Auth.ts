import {action, makeObservable, observable} from 'mobx';
import {IAuthStore} from '../types';

export default class AuthStore implements IAuthStore {
  @observable pageState = 'login';

  constructor () {
    makeObservable(this);
  }

  @action togglePage = (): void => {
    this.pageState === 'login' ? this.pageState = 'signup' : this.pageState = 'login';
  }
}