import {ChangeEvent} from 'react';
import {OlympiadStatus} from '../enums';


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
  formattedDuration: string,
  status: OlympiadStatus
}


export {IStoreWrapperProps, IAuthStore, Olympiad};