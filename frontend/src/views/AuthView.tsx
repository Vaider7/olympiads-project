import Auth from '../components/Auth/Auth';
import Body from '../components/shared/Body/Body';
import React, {useContext} from 'react';
import Provider from '../core/Provider';
import AuthStore from '../stores/AuthStore';
import {MobXProviderContext} from 'mobx-react';
import RouterStore from '../stores/RouterStore';

const AuthView = (): JSX.Element => {
  const store = useContext(MobXProviderContext).RouterStore;

  return (
    <Body excludeHeader={true}>
      <Provider AuthStore={new AuthStore(store as RouterStore)}>
        <Auth />
      </Provider>
    </Body>
  );

};


export default AuthView;