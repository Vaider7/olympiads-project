import React, {useContext} from 'react';
import Provider from '../core/Provider';
import Result from '../components/Result/Result';
import ResultStore from '../stores/ResultStore';
import {MobXProviderContext} from 'mobx-react';
import RouterStore from '../stores/RouterStore';
import Body from '../components/shared/Body/Body';

const ResultView = (): JSX.Element => {
  const stores = useContext(MobXProviderContext);

  return (
    <Body>
      <Provider ResultStore={new ResultStore(stores.RouterStore as RouterStore)}>
        <Result />
      </Provider>
    </Body>
  );
};


export default ResultView;