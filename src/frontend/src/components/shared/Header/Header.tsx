import React, {ReactNode} from 'react';
import {observer} from 'mobx-react';
import {default as s} from './Header.scss';
import {Link} from 'react-router-dom';

@observer
export default class Header extends React.Component {

  render (): ReactNode {

    return (
      <div className={s.headerWrapper}>
        <div className={s.container}>
          <div className={s.tabsContainer}>
            <Link to={'/'} className={s.tab}>Олимпиады</Link>
            <Link to={'/archive'} className={s.tab}>Архив</Link>
            <Link to={'/teacher'} className={s.tab}>Преподавателю</Link>
          </div>
          <div>
            <Link to={'/auth'} className={s.tab}>Вход</Link>
          </div>
        </div>
      </div>
    );
  }
}