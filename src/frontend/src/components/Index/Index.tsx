import * as React from 'react';

import * as style from './Index.scss';
import {ReactNode} from 'react';
import {observer, MobXProviderContext} from 'mobx-react';


interface IProps {
  headerClass: string
  arr: number[]
}

interface ICounterStore {
  increment: () => void
  readonly currentTime: number
  newAction: () => string
}

@observer
export default class Index extends React.Component<IProps> {
  static contextType = MobXProviderContext;

  readonly CounterStore: ICounterStore = this.context.CounterStore;

  render (): ReactNode {
    return (
      <div>
        <h1 className={this.props.headerClass}>
          {this.CounterStore.currentTime}
        </h1>
        <button onClick={this.CounterStore.increment} className={style.default.some}>
          Just some text
        </button>
        {/*<button onClick={this.decrement}>Decrement</button>*/}
      </div>
    );
  }
}