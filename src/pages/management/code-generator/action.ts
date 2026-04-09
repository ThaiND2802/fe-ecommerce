import mitt from 'mitt'

export enum EVENTS {
  REFRESH_TABLE = 'REFRESH_TABLE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE_CODE_GENERATOR',
}

export type EventBusEvents = {
  [EVENTS.REFRESH_TABLE]: unknown
  [EVENTS.UPDATE]: unknown
  [EVENTS.DELETE]: { id: string; title: string }
}

const emitter = mitt<EventBusEvents>()

export default emitter
