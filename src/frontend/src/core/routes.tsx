import Index from '../components/index/index';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import React from 'react';

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/'}>
          <Index />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;