import React, {ReactNode} from 'react';
import {Button} from '@material-ui/core';
import {default as s} from './Teacher.scss';


const Teacher = (): ReactNode =>
  <div className={s.buttonContainer}>
    <Button className={s.button} variant={'outlined'}>Создать олимпиаду</Button>
    <Button className={s.button} variant={'outlined'}>Проверить олимпиаду</Button>
  </div>;

export default Teacher;