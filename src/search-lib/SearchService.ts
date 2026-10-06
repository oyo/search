import type { SearchHandler, SearchHandlerHelp } from './SearchHandler'
import {
  type SearchStatusListener,
  type SearchStatus,
  SearchStatusType,
} from './SearchStatusListener'
import HelpHandler from './Handler/HelpHandler'

/**
 * SearchService
 *
 * Entry point for using the SearchLibrary.
 */
export default class SearchService implements SearchHandler {
  private static instance: SearchService

  public static get Instance(): SearchService {
    return this.instance || (this.instance = new this())
  }

  public delay = -1
  public name: string = this.constructor.name
  public best: SearchHandler = HelpHandler.Instance
  public bestval: number = 0

  protected expr = ''
  protected timer?: ReturnType<typeof setTimeout>
  protected handler: SearchHandler[] = []
  protected statusListener: SearchStatusListener[] = []

  private constructor() {}

  public help(): SearchHandlerHelp {
    return {
      name: 'Search',
      description: 'The primary search handler',
      examples: [],
    }
  }

  /**
   * addHandler
   *
   * Register a number of handlers that should analyze the given input.
   *
   * @param handler An array of search handlers that should be added to the already
   * registered handlers. Sequence is irrelevant.
   *
   * @returns this
   */
  public addHandler(handler: SearchHandler[]): this {
    this.handler = this.handler.concat(handler).filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    this.handler
      .filter((h) => h instanceof HelpHandler)
      .forEach((h) => (h as HelpHandler).init(this.handler))
    return this
  }

  /**
   * addStatusListener
   *
   * Register statusListeners that should be notified on status change.
   *
   * @param listener An array of statusListeners that should be added to the already
   * registered listeners. Sequence is irrelevant.
   *
   * @returns this
   */
  public addStatusListener(listener: SearchStatusListener[]): this {
    this.statusListener = this.statusListener.concat(listener).filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    return this
  }

  /**
   * fireStatusChanged
   *
   * Notify registered statusListeners about status change.
   *
   * @param statusEvent the search status event
   *
   * @returns this
   */
  public fireStatusChange(statusEvent: SearchStatus): this {
    for (const listener of this.statusListener) {
      listener.statusChanged(statusEvent)
    }
    return this
  }

  /**
   * setDelay
   *
   * Number of milliseconds to wait for more input before the actual search is executed.
   * In an interactive suggest environment where suggest is called on every keystroke the
   * number should be set to < 0, this means that the delay is given by each handler who
   * should know better how expensive invoking a search call is. You can override this by
   * setting it to a fixed delay value - usually 0 for immediate execution.
   *
   * @param value the delay time in milliseconds
   *
   * @returns this
   */
  public setDelay(value: number): this {
    this.delay = value
    return this
  }

  /**
   * evaluate
   *
   * calls evaluate for all registered handlers to determine the best handler for the
   * query and returns the highest result.
   *
   * @override
   */
  public evaluate(expr: string): number {
    this.best = HelpHandler.Instance
    let bestval = 0
    for (const handler of this.handler) {
      const val = handler.evaluate(expr)
      // console.log(handler.name + ': ' + val);
      if (val > bestval) {
        bestval = val
        this.best = handler
      }
    }
    return bestval
  }

  /**
   * search
   *
   * Evaluate the current search term. If a timer is running waiting to submit an older
   * term it will be stopped.
   *
   * @override
   */
  public search(expr: string): this {
    this.fireStatusChange({
      type: SearchStatusType.INPUT_RECEIVED,
      value: expr,
    })
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.expr = expr.trim()
    this.bestval = this.evaluate(this.expr)
    return this
  }

  /**
   * then
   *
   * Starts a timer that will invoke the best search handler after waiting the specified
   * delay time and then invoking the callback with the result.
   *
   * @override
   */
  public then(call: (result: any) => void): this {
    this.timer = setTimeout(
      () => {
        this.fireStatusChange({
          type: SearchStatusType.SEARCH_SUBMITTED,
          handler: this.best,
          value: this.bestval,
        })
        ;(this.best.search(this.expr) as SearchHandler).then((result) => {
          this.fireStatusChange({
            type: SearchStatusType.RESULT_RECEIVED,
            handler: this.best,
            value: result,
          })
          call(result)
        })
      },
      this.delay < 0 ? this.best.delay : this.delay,
    )
    return this
  }
}
