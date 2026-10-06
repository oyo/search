import { ActiveHandlers } from './ActiveHandlers'
import type { SearchHandler } from './SearchHandler'
import SearchService from './SearchService'
import type { SearchStatusListener } from './SearchStatusListener'

export default class SearchPromise {
  public name: string = this.constructor.name

  protected DEFAULT_DELAY: number = 700

  protected service: SearchService

  public constructor() {
    this.service = SearchService.Instance.addHandler(ActiveHandlers)
  }

  public addHandler(handler: SearchHandler[]) {
    this.service.addHandler(handler)
    return this
  }

  public setImmediate(immediate: boolean) {
    this.service.setDelay(immediate ? 0 : this.DEFAULT_DELAY)
    return this
  }

  public setStatusListener(listener: SearchStatusListener[]) {
    this.service.addStatusListener(listener)
    return this
  }

  async search(expr: string, immediate?: boolean, notify?: SearchStatusListener) {
    if (immediate) {
      this.setImmediate(immediate)
    }
    if (notify) {
      this.setStatusListener([notify])
    }
    return new Promise((resolve, reject) => {
      try {
        this.service.search(expr).then((data: any) => resolve(data))
      } catch (exc) {
        reject({
          input: expr,
          error: exc,
        })
      }
    })
  }
}
