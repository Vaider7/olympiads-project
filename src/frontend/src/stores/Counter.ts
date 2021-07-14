import {makeObservable, observable, computed, action} from "mobx";

class CounterStore {
  @observable currentTime = 0;

  @action increment = () => {
    this.currentTime += 1;
  }
}