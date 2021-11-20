/* eslint no-shadow: "off" */

export enum Loading {
  PENDING,
  DONE,
  ERROR
}

export enum TaskType {
  ONE = 'one',
  MULTI = 'multi',
  HANDWRITTEN = 'handwritten',
  FREE = 'free'
}

export enum OlympiadStatus {
  WAITING_START,
  IN_PROGRESS,
  FINISHED
}
