import * as React from 'react';

import * as style from './Index.scss';
import {ReactNode} from 'react';
import {observer, MobXProviderContext} from 'mobx-react';


interface IProps {
  headerClass: string,
  arr: number[]
}

interface ICounterStore {
  increment: () => void,
  readonly currentTime: number,
  newAction: () => string
}

@observer
export default class Index extends React.Component<IProps> {
  static contextType = MobXProviderContext;
  readonly CounterStore: ICounterStore = this.context.CounterStore;

  render (): ReactNode {

    const {headerClass} = this.props;

    const {increment, currentTime} = this.CounterStore;

    return (
      <React.Component>
        <h1 className={headerClass}>
          {currentTime}
        </h1>
        <button onClick={increment} className={style.default.some}>
          Just some text
        </button>
      </React.Component>
    );
  }
}