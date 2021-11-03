import React from 'react';
import CheckIconRounded from '@material-ui/icons/CheckRounded';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {default as s} from './Notifier.scss';
import classNames from 'classnames';

const Notifier = (props: {variant: 'err' | 'success' | 'warn', text: string}): JSX.Element => {
  switch (props.variant) {
    case 'success':
      return (
        <div className={classNames(s.wrapper as string, s.successWrapper as string)}>
          <CheckIconRounded className={classNames(s.iconWrapper as string, s.successIcon as string)} />
          <span className={classNames(s.text as string, s.successText as string)}>{props.text}</span>
        </div>
      );

    case 'err':
      return (
        <div className={classNames(s.wrapper as string, s.errWrapper as string)}>
          <ChangeHistoryRoundedIcon className={classNames(s.iconWrapper as string, s.errIcon as string)} />
          <span className={classNames(s.text as string, s.errText as string)}>{props.text}</span>
        </div>
      );

    case 'warn':
      return (
        <div className={classNames(s.wrapper as string, s.warnWrapper as string)}>
          <ClearRoundedIcon className={classNames(s.iconWrapper as string, s.warnIcon as string)} />
          <span className={classNames(s.text as string, s.warnText as string)}>{props.text}</span>
        </div>
      );
  }

};

export default Notifier;
