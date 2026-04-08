export type EventAgrs = Array<unknown>
export type ListenerFunc = (...args: EventAgrs) => void
class EventEmitter {
  listenersMap = new Map<string, ListenerFunc[]>()

  public on(event: string, handler: ListenerFunc): void {
    if (!this.listenersMap.has(event)) {
      this.listenersMap.set(event, [handler])
    } else {
      this.listenersMap.get(event)?.push(handler)
    }
  }

  public off(event: string, handler: ListenerFunc): void {
    const handlers = this.listenersMap.get(event)
    if (!handlers) return
    const idx = handlers.indexOf(handler)
    if (idx !== -1) {
      handlers.splice(idx, 1)
      if (handlers.length === 0) {
        this.listenersMap.delete(event)
      }
    }
  }

  public emit(event: string, ...args: EventAgrs): void {
    const handlers = this.listenersMap.get(event)
    if (!handlers) {
      return
    }
    handlers.forEach((h) => {
      h(...args)
    })
  }
}

export default new EventEmitter()
