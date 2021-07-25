import loadable from '@loadable/component';

const AsyncLoader = loadable((props: {pathToPage: string}) => import(`./${props.pathToPage}`),
  {cacheKey: (props) => props.pathToPage});

export default AsyncLoader;