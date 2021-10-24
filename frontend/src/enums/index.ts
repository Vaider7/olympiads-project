/* eslint no-shadow: "off" */

enum Loading {
  PENDING,
  DONE,
  ERROR
}

enum TaskType {
  ONE = 'one',
  MULTI = 'multi',
  HANDWRITTEN = 'handwritten',
  FREE = 'free'
}

export {Loading, TaskType};