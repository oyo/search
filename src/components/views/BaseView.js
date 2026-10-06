import { clear, N } from '../../util/NodeUtil'

export default class BaseView extends HTMLElement {
  constructor(pstyles) {
    super()
    const template = document.createElement('template')
    template.innerHTML = `<style>${style}${pstyles || ''}</style>`
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(template.content)
    this.view = document.createElement('div')
    this.shadow.appendChild(this.view)
  }

  setData(data) {
    this.data = data
    return this
  }

  connectedCallback() {
    this.visualize()
  }

  visualize() {
    clear(this.view)
    if (!this.data) {
      return
    }
    this.view.appendChild(this.getView())
  }

  getView() {
    return N('pre', JSON.stringify(this.data, null, 2))
  }
}

const style = `
div, ul {
    font-family: "Helvetica", "Arial", sans-serif;
}

pre {
    font-family: 'Source Code Pro', 'Menlo', 'Courier New', Courier, monospace;
    background-color: #fff;
    color: #666;
    border-bottom: 1px solid #ddd;
    font-size: 1.4vh;
    margin: 0;
    padding: 1vh;
}

a.search {
    text-decoration: none;
    font-weight: bold;
    color: #1c69d4;
    padding-left: 8px;
    padding-right: 4px;
}

a.search:hover {
    color: #0354b6;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHAQMAAAAPl54dAAAABlBMVEX///+qqqrjxhVdAAAAAXRSTlMAQObYZgAAABRJREFUCNdjsGCQYfjH8B+IZRgsABmDA6RyKPIOAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-position: 0 5px;
}
`

customElements.define('base-detail', BaseView)
