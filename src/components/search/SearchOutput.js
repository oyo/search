import { viewMap } from './SearchOutputViewMap.js'
import { searchController } from '../../core/SearchController.js'
import BaseView from '../views/BaseView.js'
import { clear } from '../../util/NodeUtil.js'
import { SearchConfig } from '../../core/SearchConfig.js'

class SearchOutput extends BaseView {
  constructor() {
    super()
    this.render = false
  }

  connectedCallback() {
    searchController.output.subscribe((data) => {
      this.setData(data).visualize()
    })
    searchController.raw.subscribe(this.toggleShow.bind(this))
  }

  toggleShow() {
    this.render = !this.render
    this.visualize()
    return this
  }

  visualize() {
    clear(this.view)
    if (!this.data) {
      return
    }
    if (this.data.value && this.data.value.error) {
      if (this.data.value.error.code === 401) {
        if (!getCookie('redirect')) {
          setCookie('redirect', 'true', 600)
          location.href = `${SearchConfig.authServer}/login?redirect_url=${encodeURIComponent(location.href)}`
        } else {
          deleteCookie('redirect')
        }
      } else {
        this.view.appendChild(viewMap.ErrorHandler.setData(this.data.value))
      }
      return
    }
    const handlerName = this.render && this.data.handler && this.data.handler.name
    const view = viewMap[handlerName]
    const output =
      view && this.data.value.result
        ? view.setData(this.data.value.result)
        : viewMap.BaseHandler.setData(this.data.value)
    this.view.appendChild(output)
  }
}

customElements.define('search-output', SearchOutput)
