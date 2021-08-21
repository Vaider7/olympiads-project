import React, {ReactNode} from 'react';
import {observer} from 'mobx-react';
import * as style from './Header.scss';
import Button from '@material-ui/core/Button';

@observer
export default class Header extends React.Component {

  render (): ReactNode {
    return (
      <div className={style.default.headerWrapper}>
        <div className={style.default.container}>
          <div className={style.default.tabsContainer}>
            <a href={'/'} className={style.default.tab}>Олимпиады</a>
            <a href={'/archive'} className={style.default.tab}>Архив</a>
            <a href={'/gavno'} className={style.default.tab}>Что-то</a>
          </div>
        </div>
        <Button className={style.default.knopka}>Здарова лохи</Button>
      </div>
    );
  }
}