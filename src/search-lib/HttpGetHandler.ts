import type { SearchHandler, SearchHandlerHelp } from './SearchHandler'
import HttpOptions from './HttpOptions'

/**
 * HttpGetHandler
 *
 * Abstract base class for the many search handlers that will submit a single http GET
 * to retrieve their search result. Look at EmployeeQHandler for a comprehensive example.
 */
export default abstract class HttpGetHandler implements SearchHandler {
  public delay = 500
  public name: string = this.constructor.name

  protected expr = ''
  protected call: (data: any) => any = () => {}

  public abstract evaluate(expr: string): number
  public abstract help(): SearchHandlerHelp
  protected abstract buildURL(): string
  protected abstract processResult(result: any): void

  public search(expr: string): this {
    this.expr = expr
    return this
  }

  public then(call: (data: any) => void): this {
    this.call = call
    const url: string = this.buildURL()
    // console.log(url);
    void this.submit(url)
    return this
  }

  private async submit(url: string) {
    //console.log(url);
    const response = await fetch(url, HttpOptions)
    this.searchLoaded(await response.text())
  }

  private searchLoaded(resultText: string): void {
    // console.log(resultText);
    let result: any
    try {
      result = JSON.parse(resultText)
      // console.log(JSON.stringify(result, null, 4));
    } catch (e) {
      console.warn('error parsing JSON', e, resultText)
      result = {}
    }
    this.call(this.processResult(result))
  }
}
