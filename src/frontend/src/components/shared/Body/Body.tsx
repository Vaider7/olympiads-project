import React, {ReactNode} from 'react';
import Header from '../Header/Header';
import {observer} from 'mobx-react';

@observer
export default class Body extends React.Component<{children: ReactNode}> {
  render (): ReactNode {
    const {children} = this.props;

    return (
      <div className={'body'}>
        <Header />
        <div className={'page'}>
          {children}
        </div>
      </div>
    );
  }
}