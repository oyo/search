import BaseView from './BaseView'
import { N } from '../../util/NodeUtil'

export default class SearchOutputView extends BaseView {
  constructor(pstyle) {
    super(`${style}${pstyle || ''}`)
  }

  setHeadline(headline) {
    this.headline = headline
    return this
  }

  getView() {
    return N('div', [N('h3', this.headline || 'Search Output'), this.getOutput(this.data)])
  }

  getOutput(data) {
    return N('pre', JSON.stringify(data, null, 2))
  }
}

const style = `
h3 {
    color: #666;
    font-style: italic;
    margin-block-start: 1vh;
    margin-block-end: 1vh;
    padding-left: 1vw;
}
`

customElements.define('searchoutput-detail', SearchOutputView)
