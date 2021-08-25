import * as React from 'react';

import * as style from './Index.scss';
import {ReactNode} from 'react';
import {observer, MobXProviderContext} from 'mobx-react';


interface ICounterStore {
  increment: () => void,
  readonly currentTime: number,
  newAction: () => string
}

@observer
export default class Index extends React.Component {
  static contextType = MobXProviderContext;
  readonly CounterStore: ICounterStore = this.context.CounterStore;

  render (): ReactNode {

    const {increment, currentTime} = this.CounterStore;

    return (
      <React.Fragment>
        Hui
      </React.Fragment>
    );
  }
}