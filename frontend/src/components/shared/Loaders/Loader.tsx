import React from 'react';
import {CircularProgress} from '@material-ui/core';
import {default as s} from './Loader.scss';
import classNames from 'classnames';

const Loader = (props: {type: 'element' | 'page', className?: string}): JSX.Element => {
  if (props.type === 'page') {
    return (
      <div className={s.wrapper}>
        <CircularProgress
          size={120}
          thickness={1}
          className={s.pageLoader}
        />
      </div>
    );
  }

  return (
    <CircularProgress
      size={120}
      thickness={1}
      className={classNames(s.loader as string, props.className)}
    />
  );

};


export default Loader;