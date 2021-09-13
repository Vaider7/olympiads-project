import Auth from '../components/Auth/Auth';
import Body from '../components/shared/Body/Body';
import React from 'react';
import Provider from '../core/Provider';
import AuthStore from '../stores/AuthStore';

const AuthView = (): JSX.Element =>
  <Body excludeHeader={true}>
    <Provider AuthStore={new AuthStore()}>
      <Auth />
    </Provider>
  </Body>;

export default AuthView;