import loadable from '@loadable/component';
import React from 'react';
import PageLoader from '../components/shared/Loaders/PageLoader';

// eslint-disable-next-line @typescript-eslint/promise-function-async
const AsyncLoader = loadable((props: {pathToPage: string}) => import(`../views/${props.pathToPage}`), {
  fallback: <PageLoader />
});

export default React.memo(AsyncLoader);