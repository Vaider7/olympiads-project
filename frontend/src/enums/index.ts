/* eslint no-shadow: "off" */

export enum Loading {
  PENDING,
  DONE,
  ERROR
}

export enum TaskType {
  ONE = 'one',
  MULTI = 'multi',
  TYPED = 'typed',
  FREE = 'free'
}

export enum OlympiadStatus {
  WAITING_START,
  IN_PROGRESS,
  FINISHED
}
