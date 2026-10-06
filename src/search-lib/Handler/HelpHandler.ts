import { type SearchResult, SearchType } from '../SearchResult'
import type { SearchHandler, SearchHandlerHelp } from '../SearchHandler'

/**
 * HelpHandler
 *
 * returns help description and examples
 */
export default class HelpHandler implements SearchHandler {
  private static instance: HelpHandler

  public static get Instance(): HelpHandler {
    return this.instance || (this.instance = new this())
  }

  public delay = 50
  public name = 'HelpHandler'

  private expr?: string
  private information: SearchHandlerHelp[] = []

  private constructor() {}

  private patterns = {
    help: /^\s*(\?|help)\s*$/i,
  }

  public help(): SearchHandlerHelp {
    return {
      name: 'Help',
      description: 'Information about how to use the search',
      examples: [
        {
          name: 'help',
          expr: '?',
        },
      ],
    }
  }

  public init(handlers: SearchHandler[]): this {
    this.information = handlers.map((h) => ({ ...h.help(), handler: h.name }))
    return this
  }

  public evaluate = (expr: string): number => (this.patterns.help.test(expr) ? 0.99 : 0.2)

  public search(expr: string): this {
    this.expr = expr
    return this
  }

  public then(call: (data: SearchResult) => void): this {
    if (!this.expr) {
      return this
    }
    const result: SearchResult = {
      input: this.expr,
      type: SearchType.HELP,
      result: this.information,
    }
    call(result)
    return this
  }
}
