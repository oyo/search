/**
 * SearchHandler
 *
 * common search handler interface.
 */
import { type SearchResult } from './SearchResult'

export type SearchHandlerExample = {
  name: string
  expr: string
}

export type SearchHandlerHelp = {
  handler?: string
  name: string
  description: string
  examples: SearchHandlerExample[]
}

export interface SearchHandler {
  /**
   * name
   *
   * the handler's identification name
   */
  name: string

  /**
   * delay
   *
   * Milliseconds of pause between keystrokes before a suggest search is triggered.
   * This number reflects how 'expensive' a suggest search for this handler is to the
   * backend. The length of the delay has a high influence on the user experience
   * (lower is better) but also on the load on backend systems (higher is better).
   * As a general rule these millisecond ranges are recommended:
   *
   * [0-300] very cheap search when the data is in memory and no network traffic is
   * required. For example when 'help' is entered and only a static help page should
   * be displayed.
   *
   * [300-700] average search calling a backend system that responds quickly and
   * doesn't cause too much load on that system, like a call to an elasticsearch or
   * solr server. Together with the response time this timespan the user won't
   * perceive as a real delay but also doesn't trigger a call on every keystroke.
   *
   * [700-1500] expensive search where you want to protect the backend system from
   * too many accidential calls.
   *
   * ([1500-x]) really expensive processes like triggering batch jobs. Don't use this
   * for suggestions - the users won't have a satisfying experience. Instead redesign
   * your user interface in a way the users are prepared to wait for a response.
   */
  delay: number

  /**
   * help
   *
   * returns helpful information how to use the handler
   *
   * @returns help information
   */
  help(): SearchHandlerHelp

  /**
   * evaluate
   *
   * Gets called for every handler on every keystroke so the search can decide
   * which handlers are relevant for the current term. This method should respond
   * very fast and not use expensive calculations - no calls to backend systems!
   * Typically should be using checking an index, pattern matching or invoking a
   * trained neural network.
   *
   * @param expr current search expression
   *
   * @returns A number between 0 and 1 giving an estimation of the probability this
   * handler can return appropriate results. For example a handler searching for
   * departments will return a low value to the term '340i' while another handler
   * searching for vehicle models will probably return a high value like 0.99.
   * For the term 'FG-230' it would be the other way round.
   */
  evaluate(expr: string): number

  /**
   * search
   *
   * trigger the search call to expr and invoke then the callback with the data
   *
   * @param expr the search expression
   *
   * @returns this
   */
  search(expr: string): this

  /**
   * then
   *
   * return search result to the callback method
   * @param call invoke this callback function with the search results
   *
   * @returns this
   */
  then(call: (data: SearchResult) => void): this
}
