import SearchOutputView from './SearchOutputView'
import { N, SL, addEvents } from '../../util/NodeUtil'
import { fromCharCode, knownCharCodeAt, charCodeInfo } from '../../util/StringUtil'

export default class UnicodeView extends SearchOutputView {
  constructor() {
    super(style)
    this.setHeadline('Unicode')
    this.lens = N(
      'div',
      [
        N('div', SL(' ')),
        N('div', ' ', { class: 'char' }),
        N('div', N('span', ' ')),
        N('div', ' '),
      ],
      { class: 'lens' },
    )
  }

  getLens(c) {
    const ci = charCodeInfo(c)
    const l = this.lens
    l.childNodes[0].firstChild.href =
      location.pathname + '?q=' + encodeURIComponent('UTF ' + ci.pageHex)
    l.childNodes[0].firstChild.firstChild.data = this.data.pageHex
    l.childNodes[1].firstChild.data = ci.char
    l.childNodes[2].firstChild.firstChild.data = ci.charHex
    l.childNodes[3].firstChild.data = ci.charCode
    return l
  }

  getTable() {
    return N(
      'table',
      N(
        'tbody',
        Array(16)
          .fill()
          .map((_, y) =>
            N(
              'tr',
              Array(16)
                .fill()
                .map((_, x) =>
                  addEvents(
                    N(
                      'td',
                      ((c) => SL('UTF ' + c, c))(
                        fromCharCode([(this.data.page << 8) + (y << 4) + x]),
                      ),
                    ),
                    {
                      click: async (e) => {
                        const str = e.target.firstChild.data
                        console.log(charCodeInfo(knownCharCodeAt(str, 0)))
                        await navigator.clipboard.writeText(str)
                      },
                      mouseenter: function (e) {
                        const str = e.target.firstChild.firstChild.data
                        this.getLens(knownCharCodeAt(str, 0))
                      }.bind(this),
                    },
                  ),
                ),
            ),
          ),
      ),
    )
  }

  getOutput() {
    return N(
      'div',
      this.data.charCode
        ? this.getLens(this.data.charCode)
        : [
            N('div', [
              N(
                'div',
                [
                  SL(`utf ${(this.data.page - 1).toString(16)}`, 'prev'),
                  SL(`utf ${(this.data.page + 1).toString(16)}`, 'next'),
                ],
                { class: 'prevnext' },
              ),
              this.getTable(),
            ]),
            this.getLens(this.data.page << 8),
          ],
      { class: 'unicode' },
    )
  }
}

const style = `.unicode * {
    font-family: "Source Code Pro", Menlo, Consolas, monospace;
}

.unicode table {
    float: left;
    border-collapse: collapse;
    z-index: 1;
}

.unicode table td {
    font-size: 32px;
    width: 48px;
    height: 48px;
    line-height: 48px;
    border: 1px solid #888;
    background-color: white;
    color:#008;
    text-align: center;
}

.unicode div.lens {
    float: left;
    width: 240px;
    height: 420px;
 	z-index: 2;
    background-color: white;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    text-align: center;
}

.unicode div.lens > * {
    border-top: 1px solid gray;
    font-size: 32px;
    line-height: 60px;
}

.unicode div.lens > *.char {
    font-size: 160px;
    line-height: 240px;
}

.unicode div.lens span:before,
.unicode div.lens a:before {
    color: #aaa;
    content: "0x"
}

a.search {
    font-weight: normal;
}

a.search:hover {
    background-position: 0 16px;
}

.unicode table a.search {
    color: black;
}

.prevnext {
    padding: 10px;
    font-size: 24px;
}
.prevnext > * {
    margin: 0 20px;
}
`

customElements.define('unicode-view', UnicodeView)
