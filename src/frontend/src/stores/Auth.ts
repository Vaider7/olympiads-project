import {makeObservable, observable} from 'mobx';

export default class AuthStore {
  @observable pageState = 'auth';

  constructor () {
    makeObservable(this);
  }
}