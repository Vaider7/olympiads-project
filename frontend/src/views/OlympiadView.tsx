import React, {useContext} from 'react';
import Olympiad from '../components/Olympiad/Olympiad';
import Provider from '../core/Provider';
import OlympiadStore from '../stores/OlympiadStore';
import {MobXProviderContext} from 'mobx-react';
import RouterStore from '../stores/RouterStore';
import Body from '../components/shared/Body/Body';

const OlympiadView = (): JSX.Element => {
  const stores = useContext(MobXProviderContext);

  return (
    <Body>
      <Provider OlympiadStore={new OlympiadStore(stores.RouterStore as RouterStore)}>
        <Olympiad />
      </Provider>
    </Body>
  );
};


export default OlympiadView;