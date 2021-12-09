import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import React from 'react';
import Provider from './Provider';

import {configure} from 'mobx';
import StoreWrapper from './StoreWrapper';

import RouterStore from '../stores/RouterStore';
import UserStore from '../stores/UserStore';

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: false
});

const Router: React.FunctionComponent = () =>
  <Provider
    RouterStore={new RouterStore()}
    UserStore={new UserStore()}
  >
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={<StoreWrapper pathToFile={'IndexView'} />}
        />
        <Route
          path={'/olympiads'}
          element={<StoreWrapper pathToFile={'IndexView'} />}
        />
        <Route
          path={'/teacher'}
          element={<StoreWrapper pathToFile={'TeacherView'} />}
        />
        <Route
          path={'/auth'}
          element={<StoreWrapper pathToFile={'AuthView'} />}
        />
        <Route
          path={'/olympiads/:olympiadId'}
          element={<StoreWrapper pathToFile={'OlympiadView'} />}
        />
        <Route
          path={'/olympiads/check-result/:olympiadId'}
          element={<StoreWrapper pathToFile={'ResultView'} />}
        />
        {/*<Route>*/}
        {/*  <>*/}
        {/*    /!*404. Добавь страницу,*!/*/}
        {/*    <Link to={'/'}>{'даун'}</Link> /!*eslint-disable-line*!/*/}
        {/*  </>*/}
        {/*</Route>*/}
      </Routes>
    </BrowserRouter>
  </Provider>;

export default Router;