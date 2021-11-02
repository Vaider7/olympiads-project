import {RouteComponentProps} from 'react-router';
import {ChangeEvent} from 'react';
import {Loading} from '../enums';

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
  loadingStatus: number,
  errorText: string
}

interface IUserStore {
  loadingStatus: Loading,
  isLogged: boolean,
  user: Record<string, unknown>,
  changeIsLogged: (value: boolean) => void,
  setUser: (user: Record<string, unknown>) => void,
  changeLoadingStatus: (status: Loading) => void
}

interface Olympiad {
  id: number,
  discipline: string,
  description: string,
  duration: number,
  name: string,
  start: Date,
  end: Date,
  formattedStart?: string,
  formattedEnd?: string,
  formattedDuration: string
}


export {IRouterStore, IStoreWrapperProps, IAuthStore, IUserStore, Olympiad};