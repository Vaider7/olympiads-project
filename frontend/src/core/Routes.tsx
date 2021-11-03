import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import React from 'react';
import Provider from './Provider';

import {configure} from 'mobx';
import StoreWrapper from './StoreWrapper';
import {RouteComponentProps} from 'react-router';

import RouterStore from '../stores/RouterStore';
import UserStore from '../stores/UserStore';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false
});

const Routes: React.FunctionComponent = () =>
  <Provider
    RouterStore={new RouterStore()}
    UserStore={new UserStore()}
  >
    <Router>
      <Switch>
        <Route
          exact={true}
          path={'/'}
          render={(props: RouteComponentProps) => <StoreWrapper {...props} pathToFile={'IndexView'} />}
        />
        <Route
          exact={true}
          path={'/teacher'}
          render={(props: RouteComponentProps) => <StoreWrapper {...props} pathToFile={'TeacherView'} />}
        />
        <Route
          exact={true}
          path={'/auth'}
          render={(props: RouteComponentProps) => <StoreWrapper {...props} pathToFile={'AuthView'} />}
        />
        <Route>
          <div>
            404. Добавь страницу,
            <Link to={'/'}> даун</Link>
          </div>
        </Route>
      </Switch>
    </Router>
  </Provider>;

export default Routes;