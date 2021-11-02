import React, {ReactNode} from 'react';
import Header from '../Header/Header';
import {observer} from 'mobx-react';
import {default as s} from './Body.scss';

@observer
export default class Body extends React.Component<{children: ReactNode, excludeHeader?: boolean}> {
  render (): ReactNode {
    const {children, excludeHeader} = this.props;

    if (!excludeHeader) {
      return (
        <div className={s.page}>
          <Header />
          <div className={s.pageWrapper}>
            {children}
          </div>
        </div>
      );
    }

    return (
      <div className={s.page}>
        {children}
      </div>
    );
  }
}