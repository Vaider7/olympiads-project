import loadable from '@loadable/component';
import React from 'react';
import Loader from '../components/shared/Loaders/Loader';

// eslint-disable-next-line @typescript-eslint/promise-function-async
const AsyncLoader = loadable((props: {pathToPage: string}) => import(`../views/${props.pathToPage}`), {
  fallback: <Loader />
});

export default React.memo(AsyncLoader);