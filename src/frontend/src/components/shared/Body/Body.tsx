import React, {ReactNode} from 'react';
import Header from '../Header/Header';
import {observer} from 'mobx-react';
import {default as s} from './Body.scss';

@observer
export default class Body extends React.Component<{children: ReactNode}> {
  render (): ReactNode {
    const {children} = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className={s.page}>
          {children}
        </div>
      </React.Fragment>
    );
  }
}