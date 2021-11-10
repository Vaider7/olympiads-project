import React from 'react';
import CheckIconRounded from '@material-ui/icons/CheckRounded';
import ChangeHistoryRoundedIcon from '@material-ui/icons/ChangeHistoryRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import {default as s} from './Notifier.scss';
import classNames from 'classnames';

interface NotifierProps {
  variant: 'err' | 'success' | 'warn',
  text: string
}

export default class Notifier extends React.Component<NotifierProps, unknown> {
  private readonly elem: React.RefObject<HTMLDivElement>;
  constructor (props: NotifierProps) {
    super(props);
    this.elem = React.createRef();
  }

  componentDidMount (): void {
    const width = this.elem.current?.offsetWidth;
    if (this.elem.current) this.elem.current.style.left = `calc(100% - ${width}px)`;
  }

  render (): JSX.Element {
    switch (this.props.variant) {
      case 'success':
        return (
          <div className={classNames(s.wrapper as string, s.successWrapper as string)} ref={this.elem}>
            <CheckIconRounded className={classNames(s.iconWrapper as string, s.successIcon as string)} />
            <span className={classNames(s.text as string, s.successText as string)}>{this.props.text}</span>
          </div>
        );

      case 'err':
        return (
          <div className={classNames(s.wrapper as string, s.errWrapper as string)} ref={this.elem}>
            <ChangeHistoryRoundedIcon className={classNames(s.iconWrapper as string, s.errIcon as string)} />
            <span className={classNames(s.text as string, s.errText as string)}>{this.props.text}</span>
          </div>
        );

      case 'warn':
        return (
          <div className={classNames(s.wrapper as string, s.warnWrapper as string)} ref={this.elem}>
            <ClearRoundedIcon className={classNames(s.iconWrapper as string, s.warnIcon as string)} />
            <span className={classNames(s.text as string, s.warnText as string)}>{this.props.text}</span>
          </div>
        );
    }

  }
}
