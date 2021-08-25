import React, {ReactNode} from 'react';
import {observer} from 'mobx-react';
import * as s from './Header.scss';
import {Link} from 'react-router-dom';


@observer
export default class Header extends React.Component {

  render (): ReactNode {

    return (
      <div className={s.default.headerWrapper}>
        <div className={s.default.container}>
          <div className={s.default.tabsContainer}>
            <Link to={'/'} className={s.default.tab}>Олимпиады</Link>
            <Link to={'/archive'} className={s.default.tab}>Архив</Link>
            <Link to={'/gavno'} className={s.default.tab}>Что-то</Link>
          </div>
        </div>
      </div>
    );
  }
}