import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {default as s} from './PageLoader.scss';


const PageLoader = (): JSX.Element =>
  <div className={s.wrapper}>
    <CircularProgress
      size={120}
      thickness={1}
      className={s.loader}
    />
  </div>;

export default PageLoader;