import {RouteComponentProps} from 'react-router';
import {ChangeEvent} from 'react';

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
  togglePage: () => void,
  recordLoginData: (e: ChangeEvent<HTMLInputElement>) => void,
  sendLogin: () => void,
  recordSignupData: (e: ChangeEvent<HTMLInputElement>) => void,
  sendSignup: () => void,
  wrongSignupData: Record<string, boolean | string>,
  wrongLoginData: Record<string, boolean | string>,
  loadingStatus: number
}


export {IRouterStore, IStoreWrapperProps, IAuthStore};