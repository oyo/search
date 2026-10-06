import { searchController } from '../../core/SearchController'
import { fromEvent } from 'rxjs'

class SearchSettings extends HTMLElement {
  constructor() {
    super()
    const template = document.createElement('template')
    template.innerHTML = `<style>${style}</style>${html}`
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content)
    this.outputRaw = shadow.querySelector('#outputRaw')
  }

  connectedCallback() {
    fromEvent(this.outputRaw, 'change').subscribe((e) => {
      searchController.raw.next(e.target.checked)
    })
  }
}

const html = `<input id="outputRaw" type="checkbox"></input><label for="outputRaw">{}</label>`

const style = `
  input[type=checkbox] {
    display: none;
  }

  label {
    user-select: none;
  }

  input[type=checkbox]+label {
    font-family: "Menlo", "Courier New", monospace;
    font-weight: bold;
    font-size: 1.8vh;
    line-height: 2.4vh;
    text-align: center;
    color: #ccc;
    border: 1px solid #ccc0;
    height: 2.4vh;
    width: 2.4vh;
    display: inline-block;
    margin: 0 0 0 0.7vw;
    padding: 0;
    cursor: pointer;
  }

  input[type=checkbox]:hover+label,
  input[type=checkbox]:checked:hover+label {
    border: 1px solid #dddf;
  }

  input[type=checkbox]:checked+label {
    color: #000;
    background-color: #ccc;
  }
`

customElements.define('search-settings', SearchSettings)
