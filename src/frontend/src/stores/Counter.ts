import {makeObservable, observable, action} from 'mobx';

export default class CounterStore {
  @observable currentTime = 0;

  constructor () {
    makeObservable(this);
  }

  @action increment = (): void => {
    this.currentTime += 1;
  }
}