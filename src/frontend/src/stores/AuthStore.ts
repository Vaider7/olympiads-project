import {action, makeObservable, observable} from 'mobx';
import {IAuthStore} from '../types';
import {ChangeEvent} from 'react';
import axios, {AxiosError} from 'axios';
import {Loading} from '../enums';

export default class AuthStore implements IAuthStore {
  @observable pageState = 'login';
  @observable loginData: Record<string, string> = {};
  @observable signupData: Record<string, string> = {};
  @observable wrongLoginData: Record<string, boolean | string> = {
    username: false,
    usernameText: '',

    password: false,
    passwordText: ''
  }

  @observable wrongSignupData: Record<string, boolean | string> = {
    firstname: false,
    firstnameText: '',

    lastname: false,
    lastnameText: '',

    username: false,
    usernameText: '',

    password: false,
    passwordText: '',

    passwordAgain: false,
    passwordAgainText: ''
  }

  @observable loadingStatus = Loading.DONE;

  @observable errorText = '';

  // eslint-disable-next-line max-len
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor () {
    makeObservable(this);
  }

  @action togglePage = (): void => {
    this.pageState === 'login' ? this.pageState = 'signup' : this.pageState = 'login';
    this.loadingStatus = Loading.DONE;
    this.errorText = '';
  }

  @action recordLoginData = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const {value, name} = target;

    this.loginData[name] = value;

    this.wrongLoginData[name] = false;
    this.wrongLoginData[`${name}Text`] = '';
  }

  @action sendLogin = async (): Promise<void> => {
    let someErr = false;

    if (!String(this.loginData.username).match(this.emailRegex) || this.loginData.username?.length > 64) {
      someErr = true;

      this.wrongLoginData.username = true;
      this.wrongLoginData.usernameText = 'Некорректный адрес электронной почты';
    }

    if (!this.loginData.username) {
      someErr = true;

      this.wrongLoginData.username = true;
      this.wrongLoginData.usernameText = '';
    }

    if (this.loginData.password?.length < 6 || this.loginData.password?.length > 22) {
      someErr = true;
      this.wrongLoginData.password = true;
      this.wrongLoginData.passwordText = 'Пароль должен содержать от 6 до 22 символов';
    }

    if (!this.loginData.password) {
      someErr = true;

      this.wrongLoginData.password = true;
      this.wrongLoginData.passwordText = '';
    }

    if (someErr) {
      return;
    }

    this.loadingStatus = Loading.PENDING;

    const formData = new FormData();

    formData.append('username', this.loginData.username);
    formData.append('password', this.loginData.password);

    try {
      const result = await axios.post(
        '/api/token',
        formData
      );

      this.changeLoadingStatus(Loading.DONE);
      localStorage.setItem('access_token', result.data.access_token as string);
      window.location.pathname = '/';
    } catch (e: unknown) {
      this.changeLoadingStatus(Loading.ERROR);

      const err = e as AxiosError;

      if (err.response) {
        this.changeErrorText(err.response.data.detail as string);
      } else if (err.request) {
        this.changeErrorText('Ошибка при отправке запроса');
      }
    }
  }


  @action recordSignupData = (e: ChangeEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement;
    const {value, name} = target;

    this.signupData[name] = value;

    this.wrongSignupData[name] = false;
    this.wrongSignupData[`${name}Text`] = '';
  }

  @action sendSignup = async (): Promise<void> => {
    let someErr = false;

    if (this.signupData.firstname?.length > 64) {
      someErr = true;

      this.wrongSignupData.firstname = true;
      this.wrongSignupData.firstnameText = 'Некорректное имя';
    }

    if (!this.signupData.firstname) {
      someErr = true;

      this.wrongSignupData.firstname = true;
      this.wrongSignupData.firstnameText = '';
    }

    if (this.signupData.lastname?.length > 64) {
      someErr = true;

      this.wrongSignupData.lastname = true;
      this.wrongSignupData.lastnameText = 'Некорректная фамилия';
    }

    if (!this.signupData.lastname) {
      someErr = true;

      this.wrongSignupData.lastname = true;
      this.wrongSignupData.lastnameText = '';
    }

    if (!String(this.signupData.username).match(this.emailRegex) || this.signupData.username?.length > 64) {
      someErr = true;

      this.wrongSignupData.username = true;
      this.wrongSignupData.usernameText = 'Некорректный адрес электронной почты';
    }

    if (!this.signupData.username) {
      someErr = true;

      this.wrongSignupData.username = true;
      this.wrongSignupData.usernameText = '';
    }

    if (this.signupData.password?.length > 64 || this.signupData.password?.length < 6) {
      someErr = true;

      this.wrongSignupData.password = true;
      this.wrongSignupData.passwordText = 'Пароль должен содержать от 6 до 22 символов';
    }

    if (!this.signupData.password) {
      someErr = true;

      this.wrongSignupData.password = true;
      this.wrongSignupData.passwordText = '';
    }

    if (this.signupData.password !== this.signupData.passwordAgain) {
      someErr = true;

      this.wrongSignupData.passwordAgain = true;
      this.wrongSignupData.passwordAgainText = 'Пароли не совпадают';
    }

    if (!this.signupData.passwordAgain) {
      someErr = true;

      this.wrongSignupData.passwordAgain = true;
      this.wrongSignupData.passwordAgainText = '';
    }

    if (someErr) {
      return;
    }

    this.loadingStatus = Loading.PENDING;

    try {
      const result = await axios.post(
        '/api/signup',
        this.signupData
      );
      this.changeLoadingStatus(Loading.DONE);
      localStorage.setItem('access_token', result.data.access_token as string);
    } catch (e: unknown) {
      this.changeLoadingStatus(Loading.ERROR);

      const err = e as AxiosError;

      if (err.response) {
        this.changeErrorText(err.response.data.detail as string);
      } else if (err.request) {
        this.changeErrorText('Ошибка при отправке запроса');
      }
    }
  }

  @action changeErrorText = (text: string): void => {
    this.errorText = text;
  }

  @action changeLoadingStatus = (status: Loading): void => {
    this.loadingStatus = status;
  }
}