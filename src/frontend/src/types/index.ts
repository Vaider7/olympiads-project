import {RouteComponentProps} from 'react-router';

interface IRouterStore {
  setRoute: <T extends RouteComponentProps>(location: T['location'], match: T['match'], history: T['history']) => void,
  history: Record<string, unknown>,
  match: Record<string, unknown>,
  location: Record<string, unknown>,
  getParams: (param: string) => string | null
}

interface IStoreWrapperProps {
  pathToFile: string
}

interface IAuthStore {
  pageState: string,
  togglePage: () => void
}

export {IRouterStore, IStoreWrapperProps, IAuthStore};