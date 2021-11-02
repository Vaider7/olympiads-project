import React, {ReactNode} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {IAuthStore} from '../../../types';
import {default as s} from '../Auth.scss';
import TextField from '../../shared/Inputs/TextField';
import Button from '../../shared/Button/Button';
import {Link} from 'react-router-dom';
import {Loading} from '../../../enums';
import {CircularProgress} from '@material-ui/core';


@observer
export default class Login extends React.Component {
  static contextType = MobXProviderContext
  AuthStore: IAuthStore = this.context.AuthStore


  render (): ReactNode {
    const {
      wrongSignupData,
      recordSignupData,
      sendSignup,
      togglePage,
      errorText,
      loadingStatus
    } = this.AuthStore;

    return (
      <div className={s.pageStyle}>
        <div className={s.mainBlock}>
          <span className={s.header}>Регистрация</span>
          <form className={s.inputsContainer}>
            <TextField
              variant={'standard'}
              label={'Имя'}
              className={s.input}
              onChange={recordSignupData}
              name={'firstname'}
              error={wrongSignupData.firstname as boolean}
              helperText={wrongSignupData.firstnameText}
            />
            <TextField
              variant={'standard'}
              label={'Фамилия'}
              className={s.input}
              onChange={recordSignupData}
              name={'lastname'}
              error={wrongSignupData.lastname as boolean}
              helperText={wrongSignupData.lastnameText}
            />
            <TextField
              variant={'standard'}
              label={'Электронная почта'}
              className={s.input}
              onChange={recordSignupData}
              name={'username'}
              error={wrongSignupData.username as boolean}
              helperText={wrongSignupData.usernameText}
            />
            <TextField
              variant={'standard'}
              label={'Пароль'}
              className={s.input}
              onChange={recordSignupData}
              error={wrongSignupData.password as boolean}
              helperText={wrongSignupData.passwordText}
              name={'password'}
              type={'password'}
              autoComplete={'new-password'}
            />
            <TextField
              variant={'standard'}
              label={'Повторите пароль'}
              className={s.input}
              onChange={recordSignupData}
              name={'passwordAgain'}
              error={wrongSignupData.passwordAgain as boolean}
              helperText={wrongSignupData.passwordAgainText}
              type={'password'}
              autoComplete={'new-password'}
            />
            <Button
              variant={'outlined'}
              className={s.input}
              onClick={sendSignup}
            >
              {loadingStatus === Loading.PENDING ?
                <CircularProgress thickness={1} className={s.progress} /> : 'Подтвердить'}
            </Button>
          </form>
          <div className={s.bottom}>
            <Link to={'/'}>
              <Button variant={'text'}>На главную</Button>
            </Link>
            <Button onClick={togglePage} variant={'text'}>Вход</Button>
          </div>
          <p className={s.errorTextSignup}>
            {errorText}
          </p>
        </div>
      </div>
    );
  }
}