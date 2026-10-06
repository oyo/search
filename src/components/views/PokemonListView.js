import { N, SL } from '../../util/NodeUtil'
import ItemListView from './ItemListView'

const magnify = (url, name) =>
  N('img', null, { id: 'zoom', src: url, alt: name, crossOrigin: 'anonymous' })

export default class PokemonListView extends ItemListView {
  constructor(pstyle) {
    super(`${style}${pstyle || ''}`)
    this.setHeadline('Pokemon')
  }

  compare(a, b) {
    return a.name.localeCompare(b.name)
  }

  getListView(item) {
    return N('li', SL(item.name))
  }

  getDetailView(item) {
    return N('div', [
      magnify(item.sprites.front_default, `${item.name} front`),
      magnify(item.sprites.back_default, `${item.name} back`),
      N('pre', JSON.stringify(item, null, 2)),
    ])
  }
}

const style = ``

customElements.define('pokemon-list', PokemonListView)
