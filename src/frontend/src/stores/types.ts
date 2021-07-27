import {RouteComponentProps} from 'react-router';

interface IRouterStore {
  setRoute: <T extends RouteComponentProps>(location: T['location'], match: T['match'], history: T['history']) => void
}

export {IRouterStore};