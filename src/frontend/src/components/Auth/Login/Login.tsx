import React, {ReactNode} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {IAuthStore} from '../../../types';

@observer
export default class Login extends React.Component {
  static contextType = MobXProviderContext
  AuthStore: IAuthStore = this.context.AuthStore


  render (): ReactNode {
    return (
      <React.Fragment>
        It & #39;s Login Page!
        {' '}
        <button onClick={this.AuthStore.togglePage}>На регистрацию</button>
      </React.Fragment>
    );
  }
}