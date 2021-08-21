import {makeObservable, observable, action} from 'mobx';

export default class CounterStore {
  @observable currentTime: number | string = 0;
  @observable obj: {hui: string} = {hui: 'malenkuy'};

  constructor () {
    makeObservable(this);
  }

  @action increment = (): void => {
    if (typeof this.currentTime === 'number') {
      this.currentTime += 1;

    }

    if (this.currentTime === 7) {
      this.currentTime = 'Egor proebal 7 raz loh';

      return;
    }

    if (typeof this.currentTime === 'string') {
      this.currentTime = 'Как можно так плохо игать?';
    }
  }

  @action newAction = (): string => '123'
}