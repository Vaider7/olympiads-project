import * as React from 'react';

import * as style from './index.scss';
import {ReactNode} from 'react';
import {observer, MobXProviderContext} from 'mobx-react';

interface Props {
  headerClass: string
}

@observer
export default class Index extends React.Component<Props> {
  static contextType = MobXProviderContext;

  render (): ReactNode {
    const {CounterStore} = this.context;

    return (
      <div>
        <h1 className={this.props.headerClass}>{CounterStore.currentTime}</h1>
        <button onClick={CounterStore.increment} className={style.default.some}>Increment</button>
        {/*<button onClick={this.decrement}>Decrement</button>*/}
      </div>
    );
  }
}
