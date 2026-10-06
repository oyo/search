import Magnify from '../../util/Magnify'
import { addEvents, N } from '../../util/NodeUtil'
import SearchOutputView from './SearchOutputView'

export default class LensView extends SearchOutputView {
  constructor() {
    super(style)
    this.setHeadline('Magnify Lens')
  }

  getOutput() {
    return N('div', [
      N('ul', [
        N('li', 'hover : show magnify view'),
        N('li', 'click : switch between normal/lens mode'),
        N('li', 'scroll : set zoom level'),
        N('li', '[shift] + scroll : set lens size'),
        N('li', '[ctrl] + scroll : set lens light intensity'),
        N('li', '[alt] + scroll : set distortion level (in lens mode)'),
      ]),
      addEvents(
        N('img', null, {
          crossOrigin: 'anonymous',
          src: this.data,
        }),
        {
          load: (e) => new Magnify().init(e.target),
        },
      ),
    ])
  }
}

const style = `
ul {
  color: gray;
}

canvas.magnify {
  margin: 20px 200px;
  border: 1px solid #cccccc;
  background: #ffffff;
}

canvas.lens {
	position: fixed;
	display: none;
	z-index: 2;
    cursor: none;
}
`

customElements.define('magnify-lens', LensView)
