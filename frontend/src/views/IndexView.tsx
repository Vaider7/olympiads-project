import Index from '../components/Index/Index';
import Body from '../components/shared/Body/Body';
import React, {useContext} from 'react';
import IndexStore from '../stores/IndexStore';
import Provider from '../core/Provider';
import UserStore from '../stores/UserStore';
import {MobXProviderContext} from 'mobx-react';
import RouterStore from '../stores/RouterStore';

const IndexView = (): JSX.Element => {
  const stores = useContext(MobXProviderContext);

  return (
    <Body>
      <Provider IndexStore={new IndexStore(stores.UserStore as UserStore, stores.RouterStore as RouterStore)}>
        <Index />
      </Provider>
    </Body>
  );
};


export default IndexView;