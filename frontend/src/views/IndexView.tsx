import Index from '../components/Index/Index';
import Body from '../components/shared/Body/Body';
import React from 'react';
import IndexStore from '../stores/IndexStore';
import Provider from '../core/Provider';

const IndexView = (): JSX.Element =>
  <Body>
    <Provider IndexStore={new IndexStore()}>
      <Index />
    </Provider>
  </Body>;

export default IndexView;