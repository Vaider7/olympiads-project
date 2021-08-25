import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import Provider from './Provider';
import CounterStore from '../stores/Counter';

import {configure} from 'mobx';
import StoreWrapper from './StoreWrapper';
import {RouteComponentProps} from 'react-router';

import RouterStore from '../stores/RouterStore';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false
});

const Routes: React.FunctionComponent = () =>
  <Provider CounterStore={new CounterStore()} RouterStore={new RouterStore()}>
    <Router>
      <Switch>
        <Route
          exact={true}
          path={'/'}
          render={(props: RouteComponentProps) => <StoreWrapper {...props} pathToFile={'IndexView'} />}
        />
        <Route>
          <div>404 хуета</div>
        </Route>
      </Switch>
    </Router>
  </Provider>;

export default Routes;