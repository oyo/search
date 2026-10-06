import './SearchInput'
import './SearchSettings'
import './SearchOutput'
import { searchController } from '../../core/SearchController'
import { SearchStatusType } from '../../search-lib'

class SearchApp extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = html
  }

  connectedCallback() {
    window.addEventListener(
      'popstate',
      (e) => {
        const param = new URLSearchParams(e.target.location.search).get('q') || ''
        searchController.input.next(param)
      },
      false,
    )
    searchController.status.subscribe((status) => {
      if (
        status.type === SearchStatusType.RESULT_RECEIVED &&
        status.handler.name !== 'HelpHandler'
      ) {
        const expr = status.handler.expr
        const newTitle = `Search${expr ? ' - ' + expr : ''}`
        if (document.title !== newTitle) {
          document.title = newTitle
        }
        const search = `?q=${encodeURIComponent(expr)}`
        if (location.search !== search) {
          history.pushState(
            null,
            document.title,
            `${location.protocol}//${location.host}${location.pathname}${search}`,
          )
        }
      }
    })
    searchController.clear.subscribe((clear) => {
      if (clear) {
        document.title = 'Search'
        if (location.search !== '') {
          history.pushState(
            null,
            document.title,
            `${location.protocol}//${location.host}${location.pathname}`,
          )
        }
      }
    })
    const param = new URLSearchParams(location.search).get('q') || ''
    searchController.input.next(param)
  }
}

const html = `
<search-input></search-input>
<search-settings></search-settings>
<search-output></search-output>
`

customElements.define('search-app', SearchApp)
