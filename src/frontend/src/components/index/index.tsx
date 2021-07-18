import * as React from 'react';

import * as style from './index.scss';
import {ReactNode} from 'react';

export default class Index extends React.Component {
  state = {
    count: 0
  };

  increment = (): void => {
    this.setState({
      count: this.state.count + 1
    });
  }

  decrement = (): void => {
    this.setState({
      count: this.state.count - 1
    });
  }

  render (): ReactNode {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment} className={style.default.some}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}
