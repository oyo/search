import BaseView from '../BaseView/BaseView'
import { N, SL } from '../../util/NodeUtil'
import {
  formatLdapDn,
  isDatePattern,
  isLdapPattern,
  isSearchPattern,
  normDate,
} from '../../util/PatternUtil'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default class ItemDetailView extends BaseView {
  constructor() {
    super(style)
  }

  getView() {
    return N(
      'table',
      N(
        'tbody',
        Object.keys(this.data)
          .filter((k) => this.keyFilter(k, this.data[k]))
          .sort()
          .map((k) => N('tr', [N('th', k), N('td', this.keyCheck(k, this.data[k]))]))
          .concat(N('tr', [N('th', 'actions'), N('td', this.getActions())])),
      ),
    )
  }

  isBinary(_key, value) {
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i)
      if (code < 32 || code > 255) return true
    }
    return false
  }

  keyFilter(_key, _value) {
    return true
  }

  keySort(_key, value) {
    return value
  }

  keyCheck(key, value) {
    if (value instanceof Array) {
      return N(
        'ul',
        this.keySort(key, value).map((v) => N('li', this.keyCheck(key, v))),
        { class: 'attlist' },
      )
    }
    if (isDatePattern(value)) {
      const date = normDate(value)
      return N('pre', [dayjs(date).fromNow(), ' ', SL(date)], { class: 'date' })
    }
    if (isLdapPattern(value)) {
      return N('span', formatLdapDn(value), { class: 'ldapdn' })
    }
    if (this.isBinary(key, value)) {
      return N('pre', '<binary data>')
    }
    return this.canSearch(key, value) ? SL(value) : this.keyValue(key, value)
  }

  canSearch(_key, value) {
    return isSearchPattern(value)
  }

  keyValue(_key, value) {
    return value
  }

  getActions() {
    console.log(this.data.dn)
    return this.data.dn.match(/^(ou|o|dc)=/i)
      ? [SL('*,' + this.data.dn, '(✱)'), SL(this.data.dn, 'details')]
      : SL(this.data.dn, 'details')
  }
}

const style = `td, th {
    padding: 0.8vh 0.8vw 0.8vh 0.8vw;    
}

td {
    background-color: white;
    text-align: right;
    font-size: 1.4vh;
}

th {
    text-align: left;
    color: #800;
    background-color: #f8f8f8;
    font-size: 1.2vh;
    font-weight: bold;
}

ul {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
}

ul > li {
    list-style-type: none;
}

ul.attlist {
    line-height: 2vh;
}

td pre {
    padding: 0;
    border: 0;
}`

customElements.define('item-detail', ItemDetailView)
