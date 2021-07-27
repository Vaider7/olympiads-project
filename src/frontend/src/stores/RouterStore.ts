import {observable, get, action, makeObservable} from 'mobx';
import {RouteComponentProps} from 'react-router';

export default class RouterStore {
  @observable location = {};
  @observable match = {};
  history = {};

  constructor () {
    makeObservable(this);
  }

  @action setRoute<K extends RouteComponentProps> (
    location: K['location'],
    match: K['match'],
    history: K['history']
  ): void {
    this.location = location;
    this.match = match;
    this.history = history;
  }

  @action getParams = (param: string): string | null => {
    const search = get(this.location, 'search');

    const urlAddress = new URLSearchParams(search);

    return urlAddress.get(param);
  }
}
