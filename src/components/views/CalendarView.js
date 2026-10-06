import SearchOutputView from './SearchOutputView'
import { N, SL } from '../../util/NodeUtil'
import dayjs from 'dayjs'
import { normDate } from '../../util/PatternUtil'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default class CalendarView extends SearchOutputView {
  constructor() {
    super(style)
    this.setHeadline('Calendar')
  }

  getMonthName(month) {
    return N('div', monthNames[month], { class: 'monthname' })
  }

  getWeekday(weekday) {
    return N('div', weekday, { class: 'day weekday' })
  }

  getEmptyDay() {
    return N('div', '', { class: 'day empty' })
  }

  getDay(year, month, day) {
    const date = dayjs(`${year}-${month + 1}-${day + 1}`)
    const wd = date.day()
    const id = date.format('YYYYMMDD')
    const node = N('div', SL(date.format('YYYY-MM-DD'), day + 1), {
      id: 'DATE' + id,
      class: `day ${wd === 0 || wd === 6 ? 'weekend' : 'workday'}`,
    })
    return node
  }

  getMonth(year, month) {
    const d = dayjs(`${year}-${month + 1}`)
    const fillStartDays = d.day() ? d.day() - 1 : 6
    const daysOfMonth = d.endOf('month').date()
    const fillEndDays = 42 - (fillStartDays + daysOfMonth)
    return N(
      'li',
      [this.getMonthName(month)]
        .concat('MDMDFSS'.split('').map((wd) => this.getWeekday(wd)))
        .concat(
          Array(fillStartDays)
            .fill()
            .map(() => this.getEmptyDay()),
        )
        .concat(
          Array(daysOfMonth)
            .fill()
            .map((n, day) => this.getDay(year, month, day)),
        )
        .concat(
          Array(fillEndDays)
            .fill()
            .map(() => this.getEmptyDay()),
        ),
      { class: 'month' },
    )
  }

  getYear(year) {
    return N(
      'ol',
      Array(12)
        .fill()
        .map((i, month) => this.getMonth(year, month)),
      { class: 'year' },
    )
  }

  drawMarker() {
    const id = 'DATE' + this.norm.format('YYYYMMDD')
    const item = this.shadow.getElementById(id)
    const bounds = item.getBoundingClientRect()
    const marker = N('div', '◯', {
      class: 'marker',
      style: `left:${bounds.left + 1}px;top:${bounds.top - 2}px`,
    })
    this.view.appendChild(marker)
  }

  getOutput() {
    this.norm = dayjs(normDate(this.data))
    const date = dayjs(this.norm)
    const year = date.year()
    const prev = date.add(-1, 'year')
    const next = date.add(1, 'year')
    setTimeout(this.drawMarker.bind(this), 50)
    return N(
      'ul',
      [
        N('li', N('pre', this.data)),
        N('li', SL(year), { class: 'thisyear' }),
        N('li', this.getYear(year)),
        N(
          'li',
          [SL(prev.format('YYYY-MM-DD'), prev.year()), SL(next.format('YYYY-MM-DD'), next.year())],
          { class: 'prevnext' },
        ),
      ],
      { class: 'calendar' },
    )
  }
}

const style = `.calendar {
    list-style-type: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
}

pre {
    width: 970px;
    margin: 8px 10px 8px 10px;
}

ol {
    list-style-type: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
}

.thisyear, .prevnext {
    padding-top: 10px;
    padding-bottom: 10px;
}

.thisyear {
    width: 1000px;
    text-align: center;
}

.prevnext {
    clear: both;
}

.prevnext > * {
    margin-right: 900px;
}

.year {
    float: left;
    width: 1010px;
}

.month {
    float: left;
    width: 232px;
    margin: 8px 10px 8px 10px;
    background-color: white;
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%);
}

.monthname, .weekday, .emptyday, .day {
    float: left;
	text-align: center;
	padding: 0px;
	margin: 0.5px;
}

.monthname, .weekday {
    font-size: 14px;
    font-weight: bold;
    color: #444;
}

.monthname {
    width: 100%;
    line-height: 32px;
}

.weekday, .emptyday, .day {
    width: 32px;
	height: 28px;
	line-height: 28px;
}

.weekday {
	background-color: #eee;
}

.day {
    font-size: 12px;
	background-color: #f0f0f0;
	cursor: default;
}

.workday {
    background-color: #fffff0;
}

.weekend {
    background-color: #fff0f0;
}

.today {
    background-color: gray;
    color: white;
}

.marker {
    position: absolute;
    font-size: 36px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    color: orange;
}`

customElements.define('calendar-view', CalendarView)
