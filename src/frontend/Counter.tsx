import * as React from 'react';

import './Style.scss'

export default class Counter extends React.Component {
  state = {
    count: 0
  };
  hui: Array<number> = [123]
  increment = (): void => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = (): void => {
    this.setState({
      count: this.state.count - 1
    });
  };

  render (): JSX.Element {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment} className={'some'}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}