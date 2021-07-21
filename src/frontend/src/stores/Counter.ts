import {makeObservable, observable, action} from 'mobx';
import {observer, MobXProviderContext} from 'mobx-react';

export default class CounterStore {
  @observable currentTime = 0;

  constructor () {
    makeObservable(this);
  }

  @action increment = (): void => {
    this.currentTime += 1;
    console.log('hui');
  }

  @action newAction = (): string => '123'
}