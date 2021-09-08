import React, {ReactNode} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {IAuthStore} from '../../types';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';


@observer
export default class Auth extends React.Component {
  static contextType = MobXProviderContext;
  AuthStore: IAuthStore = this.context.AuthStore;


  render (): ReactNode {

    if (this.AuthStore.pageState === 'login') {
      return (
        <Login />
      );
    }

    return (
      <SignUp />
    );
  }
}