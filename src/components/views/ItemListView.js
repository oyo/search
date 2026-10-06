import SearchOutputView from './SearchOutputView'
import { N } from '../../util/NodeUtil'

export default class ItemListView extends SearchOutputView {
  constructor(pstyles) {
    super(`${styles}${pstyles || ''}`)
  }

  getOutput(data) {
    if (!data || data.length === 0) return N('pre', ' - no results - ')
    if (!Array.isArray(data)) return this.getDetailView(data)
    if (data.length === 1) return this.getDetailView(data[0])
    return N(
      'ul',
      data.sort(this.compare.bind(this)).map((item) => N('li', this.getListView(item))),
    )
  }

  compare(_a, _b) {
    return 0
  }

  getListView(item) {
    return N('li', N('pre', JSON.stringify(item, null, 2)))
  }

  getDetailView(item) {
    return N('pre', JSON.stringify(item, null, 2))
  }
}

const styles = `ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
}

li {
    list-style-type: none;
    padding: 1.5vh 1.5vh 1.5vh 6vh;
    border-bottom: 1px solid #ddd;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 48px 48px;
}`

customElements.define('item-list', ItemListView)
