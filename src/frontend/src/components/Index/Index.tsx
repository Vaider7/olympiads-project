import * as React from 'react';

import * as style from './Index.scss';
import {ReactNode} from 'react';
import {observer, MobXProviderContext} from 'mobx-react';
import {RouteComponentProps} from 'react-router';

interface IProps {
  headerClass: string
}

interface ICounterStore {
  increment: () => void
  currentTime: number
  newAction: () => string
}

@observer
export default class Index extends React.Component<IProps> {
  static contextType = MobXProviderContext;

  CounterStore: ICounterStore = this.context.CounterStore;

  render (): ReactNode {

    return (
      <div>
        <h1 className={this.props.headerClass}>{this.CounterStore.currentTime}</h1>
        <button onClick={this.CounterStore.increment} className={style.default.some}>Increment</button>
        {/*<button onClick={this.decrement}>Decrement</button>*/}
      </div>
    );
  }
}