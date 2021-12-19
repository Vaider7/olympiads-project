import {ChangeEvent} from 'react';
import {OlympiadStatus, TaskType} from '../enums';


export interface Tuple<T, U> extends Array<T|U> {
  0: T,
  1: U
}

export interface IStoreWrapperProps {
  pathToFile: string
}

export interface IAuthStore {
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


export interface Olympiad {
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

export interface Task {
  id: number,
  name?: string,
  description: string,
  question: string,
  answers?: {no: number, possibleAnswer: string}[],
  taskType: TaskType,
  typedAnswer?: string[],
  deletedAt?: Date,
  olympiadId: number,
  points: number
}

export interface Result {
  taskName: string,
  taskId: number,
  taskPoints: number,
  taskAnswers: {no: number, possibleAnswer: string, verity: boolean}[],
  typedAnswer: string[],
  rightAnswers: string[],
  userAnswer: string[],
  userPoints: number,
  taskType: TaskType
}