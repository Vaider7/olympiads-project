import React, {ReactNode} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {IAuthStore} from '../../../types';
import {default as s} from '../Auth.scss';
import TextField from '../../shared/Inputs/TextField';
import Button from '../../shared/Button/Button';
import {Link} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';
import {Loading} from '../../../enums';

@observer
export default class Login extends React.Component {
  static contextType = MobXProviderContext
  AuthStore: IAuthStore = this.context.AuthStore


  render (): ReactNode {
    const {
      wrongLoginData,
      recordLoginData,
      togglePage,
      sendLogin,
      loadingStatus,
      errorText
    } = this.AuthStore;

    return (
      <div className={s.pageStyle}>
        <div className={s.mainBlock}>
          <span className={s.header}>Вход</span>
          <form className={s.inputsContainer}>
            <TextField
              name={'username'}
              onChange={recordLoginData}
              variant={'standard'}
              label={'Электронная почта'}
              className={s.input}
              type={'email'}
              autoComplete={'email'}
              error={wrongLoginData.username as boolean}
              helperText={wrongLoginData.usernameText}
            />
            <TextField
              name={'password'}
              onChange={recordLoginData}
              variant={'standard'}
              label={'Пароль'}
              className={s.input}
              type={'password'}
              autoComplete={'current-password'}
              error={wrongLoginData.password as boolean}
              helperText={wrongLoginData.passwordText}
            />
            <Button
              variant={'outlined'}
              className={s.input}
              onClick={sendLogin}
            >
              {loadingStatus === Loading.PENDING ?
                <CircularProgress thickness={1} className={s.progress} /> : 'Войти'}

            </Button>
          </form>
          <div className={s.bottom}>
            <Link to={'/'}>
              <Button variant={'text'}>На главную</Button>
            </Link>
            <Button onClick={togglePage} variant={'text'}>Регистрация</Button>
          </div>
          <p className={s.errorText}>
            {errorText}
          </p>
        </div>
      </div>
    );
  }
}