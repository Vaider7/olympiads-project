import Index from '../components/Index/Index';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import Provider from './Provider';
import CounterStore from '../stores/Counter';

import {configure} from 'mobx';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false
});

const Routes: React.FunctionComponent = () =>
  <Provider CounterStore={new CounterStore()}>
    <Router>
      <Switch>
        <Route path='/' render={() => <Index headerClass={'123'}/>} />
      </Switch>
    </Router>
  </Provider>;

export default Routes;