import loadable from '@loadable/component';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/promise-function-async
const AsyncLoader = loadable((props: {pathToPage: string}) => import(`../views/${props.pathToPage}`));

export default React.memo(AsyncLoader);