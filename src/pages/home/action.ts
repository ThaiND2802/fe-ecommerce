import mitt from 'mitt'

export enum EVENTS {
  SAVE = 'SAVE',
}

export type EventBusEvents = {
  [EVENTS.SAVE]: unknown
}

const emitter = mitt<EventBusEvents>()

export default emitter
