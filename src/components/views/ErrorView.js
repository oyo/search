import SearchOutputView from './SearchOutputView'
import { N } from '../../util/NodeUtil'

export default class ErrorView extends SearchOutputView {
  constructor() {
    super(style)
    this.setHeadline('Error')
  }

  getOutput() {
    return N('pre', JSON.stringify(this.data, null, 2))
  }
}

const style = `pre {
    color: rgb(238, 84, 46);
}`

customElements.define('error-view', ErrorView)
