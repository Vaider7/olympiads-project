import loadable from '@loadable/component';
import React from 'react';

const AsyncLoader = loadable((props: {pathToPage: string}) => import(`../views/${props.pathToPage}`));

export default React.memo(AsyncLoader);