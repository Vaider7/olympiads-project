import React from 'react';
import {default as s} from './ErrorPage.scss';

const ErrorPage = (): JSX.Element =>
  <div className={s.wrapper}>
    <span className={s.text}>Произошла ошибка</span>
    <span className={s.subText}>Обновите страницу или повторите попытку позднее</span>
  </div>;

export default ErrorPage;