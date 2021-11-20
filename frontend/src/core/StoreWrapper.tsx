import React, {useContext} from 'react';
import AsyncLoader from './LoadableComponents';
import ErrorBoundary from './ErrorBoundary';
import {useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {MobXProviderContext} from 'mobx-react';
import RouterStore from '../stores/RouterStore';


// eslint-disable-next-line react/display-name
export default (props: { pathToFile: string }): JSX.Element => {
  const navigator = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [, setSearchParams] = useSearchParams();
  const stores = useContext(MobXProviderContext);
  const RouterStore: RouterStore = stores.RouterStore; // eslint-disable-line no-shadow, prefer-destructuring

  RouterStore.setRouterStore(navigator, location, params, setSearchParams);

  return (
    <ErrorBoundary>
      <AsyncLoader pathToPage={props.pathToFile} />
    </ErrorBoundary>
  );
};