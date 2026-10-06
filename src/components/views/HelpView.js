import SearchOutputView from './SearchOutputView'
import { N, SL } from '../../util/NodeUtil'

export default class HelpView extends SearchOutputView {
  constructor() {
    super(style)
    this.setHeadline('Help')
  }

  getOutput() {
    return N(
      'ul',
      this.data.map((item) =>
        N('li', [
          N('span', item.name + ' - ' + item.description),
          N(
            'ul',
            item.examples.map((example) => N('li', [N('span', example.name), SL(example.expr)])),
          ),
        ]),
      ),
      { class: 'help' },
    )
  }
}

const style = `
ul {
    list-style-type: none;
    padding-inline-start: 0;
    line-height: 2.3vh;
}

ul.help > li {
    padding: 12px;
}

ul.help > li > *:first-child {
    font-weight: bold;
    color: #666;
    padding: 6px;
}

ul.help > li > ul {
    background-color: white;
    margin-top: 6px;
}

ul.help > li > ul:last-child {
    border-bottom: 1px solid #ddd;
}

ul.help > li > ul > li > span {
    display: inline-block;
    width: 30vw;
    min-width: 30vw;
    margin-right: 20px;
}

ul.help > li > ul > li {
    padding: 5px;
}
`

customElements.define('help-detail', HelpView)
