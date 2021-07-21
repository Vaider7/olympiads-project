import Index from '../components/index/index';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import React from 'react';
import Provider from './Provider';
import CounterStore from '../stores/Counter';

const Routes: React.FunctionComponent = () =>
  <Router>
    <Switch>
      <Route path={'/'}>
        <Provider CounterStore={new CounterStore()}>
          <Index headerClass={'hueta'} />
        </Provider>
      </Route>
    </Switch>
  </Router>;

export default Routes;