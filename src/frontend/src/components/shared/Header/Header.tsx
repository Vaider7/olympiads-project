import React, {ReactNode} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {default as s} from './Header.scss';
import {Link} from 'react-router-dom';
import {Loading} from '../../../enums';
import PageLoader from '../Loaders/PageLoader';

@observer
export default class Header extends React.Component {
  static contextType = MobXProviderContext;
  UserStore = this.context.UserStore;

  render (): ReactNode {
    const {loadingStatus} = this.UserStore;

    if (loadingStatus === Loading.PENDING) {
      return <PageLoader />;
    }

    return (
      <div className={s.headerWrapper}>
        <div className={s.container}>
          <div className={s.tabsContainer}>
            <Link to={'/'} className={s.tab}>Олимпиады</Link>
            <Link to={'/archive'} className={s.tab}>Архив</Link>
            <Link to={'/teacher'} className={s.tab}>Преподавателю</Link>
          </div>
          <div>
            {this.UserStore.isLogged ?
              <Link to={'/me'} className={s.tab}>Профиль</Link> :
              <Link to={'/auth'} className={s.tab}>Вход</Link>}
          </div>
        </div>
      </div>
    );
  }
}