import SearchOutputView from './SearchOutputView'
import { N, SL } from '../../util/NodeUtil'

const style = `
div.test {
  padding: 20px;
  background-color: white;
  border: 1px solid gray;
}
`

export default class TestView extends SearchOutputView {
  constructor() {
    super(style)
    this.setHeadline('Test Page')
  }

  getOutput() {
    return N(
      'div',
      N('p', ["This is a minimal output example. Here's a ", SL('UTF 🍪', 'cookie')]),
      {
        class: 'test',
      },
    )
  }
}

customElements.define('test-detail', TestView)
