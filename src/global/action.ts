import mitt from 'mitt'

export enum EVENTS {
  EXAMPLE_ACTION = 'EXAMPLE_ACTION',
}

export type EventBusEvents = {
  [EVENTS.EXAMPLE_ACTION]: unknown
}

const emitter = mitt<EventBusEvents>()

export default emitter
