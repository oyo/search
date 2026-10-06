//import styles from './ErrorListView.style.scss';
import BaseView from '../BaseView/BaseView'
import { N } from '../../util/NodeUtil'

export default class ErrorListView extends BaseView {
  constructor() {
    super(style)
  }

  getView() {
    if (this.data.message) {
      return N('pre', `${this.data.message} - ${this.data.info}\n${this.data.errorMessage}\n`)
    }
    return N('pre', JSON.stringify(this.data, null, 2))
  }
}

const style = `pre {
    color: rgb(238, 84, 46);
}`

customElements.define('error-list-view', ErrorListView)
