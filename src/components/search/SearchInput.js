import { searchController } from '../../core/SearchController'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

class SearchInput extends HTMLElement {
  constructor() {
    super()
    const template = document.createElement('template')
    template.innerHTML = `${html}<style>${style}</style>`
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(template.content)
    this.input = shadow.querySelector('input')
    this.stream = fromEvent(this.input, 'keyup')
      .pipe(debounceTime(30))
      .subscribe((d) => {
        searchController.input.next(d.target.input.value)
      })
    this.stream = fromEvent(this.input, 'search').subscribe(() => {
      searchController.input.next('')
      searchController.clear.next(true)
    })
  }

  connectedCallback() {
    this.input.focus()
    searchController.input.subscribe((data) => {
      this.visualize(data)
    })
    searchController.loading.subscribe(
      (status) => (this.input.className = status ? 'doload' : 'noload'),
    )
  }

  visualize(data) {
    this.input.value = data
  }
}

const html = `<input type="search" class="noload"></input>`

const style = `
input {
    color: #666;
    padding: 1vh 1vw 1vh 30px;
    font-size: 2vh;
    font-weight: bold;
    width: 80vw;
    outline: 0;
    box-shadow: 0 5px 10px 0 rgb(0 0 0 / 5%);
    border: 1px solid #ddd;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-position: 6px 1.6vh;
}

.doload {
    background-image: url(data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA);
}

.noload {
    background-image: url(data:image/gif;base64,R0lGODlhEAALAIABAMzMzP///yH5BAEKAAEALAAAAAAQAAsAAAIdjI+pi+BgHgxy2ojppdnuH4Hc6HSm9oQlOjHuexQAOw==);
}
`

customElements.define('search-input', SearchInput)
