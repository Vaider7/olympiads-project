import React from 'react';
import Button from '../shared/Button/Button';
import {default as s} from './Teacher.scss';

const Teacher = (): JSX.Element =>
  <div className={s.buttonContainer}>
    <Button className={s.button} variant={'outlined'}>Создать олимпиаду</Button>
    <Button className={s.button} variant={'outlined'}>Проверить олимпиаду</Button>
  </div>;

export default Teacher;