import HttpGetHandler from '../HttpGetHandler'
import { SearchSettings } from '../SearchSettings'
import type { SearchResult } from '../SearchResult'
import type { SearchHandlerHelp } from '../SearchHandler'

/**
 * MeHandler
 *
 * Retrieve information about the user.
 */
export default class MeHandler extends HttpGetHandler {
  private static instance: MeHandler

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }

  public delay = 100
  public name = 'MeHandler'

  private patterns = {
    me: /^(me|user|profile)$/i,
  }

  private constructor() {
    super()
  }

  public help(): SearchHandlerHelp {
    return {
      name: 'Profile',
      description: 'Information about current user',
      examples: [
        {
          name: 'User',
          expr: 'me',
        },
      ],
    }
  }

  public evaluate = (expr: string): number => {
    return this.patterns.me.test(expr) ? 0.999 : 0
  }

  protected buildURL = (): string => {
    return `${SearchSettings.server.search}/v1/info/me`
  }

  protected processResult(result: SearchResult): SearchResult {
    return result
  }
}
