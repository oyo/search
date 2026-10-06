import BaseView from '../views/BaseView/BaseView'
import { searchController } from '../../core/SearchController'
import { SL } from '../../util/NodeUtil'

export default class SearchProfile extends BaseView {
  constructor() {
    super(style)
    this.setData(true)
    searchController.profile.subscribe(() => this.loadUser())
  }

  loadUser() {
    this.photo = '/img/shape-person.svg'
  }

  getView() {
    if (this.photo) {
      this.view.style.backgroundImage = `url(${this.photo})`
    }
    return SL('me')
  }
}

const style = `div {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    background-color: white;
    background-image: url(/img/shape-person.svg);
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 40px 40px;
}

div a.search {
    visibility: hidden;
}

div:hover a.search {
    visibility: visible;
}

a.search {
    text-shadow: 1px 1px 5px white;
}`

customElements.define('search-profile', SearchProfile)
