import { isDatePattern } from '../util/PatternUtil'
import dayjs from 'dayjs'

export class CalendarHandler {
  delay = 50
  name = 'CalendarHandler'

  patterns = {
    year: /^((19|20)\d\d)$/i,
    term: /^(today|tomorrow|yesterday|now|date|time)$/i,
  }

  help() {
    return {
      name: 'Calendar',
      description: 'Date and time information',
      examples: [
        {
          name: 'Date',
          expr: 'today',
        },
        {
          name: 'Year',
          expr: '2026-04-13',
        },
      ],
    }
  }

  evaluate(expr) {
    return this.patterns.year.test(expr) || this.patterns.term.test(expr) || isDatePattern(expr)
      ? 0.98
      : 0
  }

  search(expr) {
    const date = expr.toLowerCase()
    switch (date) {
      case 'date':
      case 'today':
        this.expr = dayjs().format('YYYY-MM-DD')
        break
      case 'tomorrow':
        this.expr = dayjs().add(1, 'day').format('YYYY-MM-DD')
        break
      case 'yesterday':
        this.expr = dayjs().add(-1, 'day').format('YYYY-MM-DD')
        break
      case 'now':
      case 'time':
        this.expr = dayjs().format('YYYY-MM-DD hh:mm:ss')
        break
      default:
        this.expr = expr
    }
    return this
  }

  then(call) {
    call({
      result: this.expr,
    })
    return this
  }
}
