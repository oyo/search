import { knownCharCodeAt, charCodeInfo } from '../util/StringUtil.js'

export class UnicodeHandler {
  delay = 50
  name = 'UnicodeHandler'

  patterns = {
    unicode: /(^|\s+)(utf-?\d?\d?|unicode)(\s+[0-9a-f]{1,3})?($|\s+)/i,
  }

  help() {
    return {
      name: 'Unicode',
      description: 'UTF character tables',
      examples: [
        {
          name: 'Page (hex)',
          expr: 'utf 26',
        },
        {
          name: 'Character',
          expr: 'utf 🌠',
        },
      ],
    }
  }

  evaluate(expr) {
    return this.patterns.unicode.test(expr) ? 0.99 : 0
  }

  search(expr) {
    this.expr = expr
    var page = expr.replace(/(^|\s+)(utf-?\d?\d?|unicode)\s*/i, '').trim()
    if (page.length === 0) page = '0'
    const code = knownCharCodeAt(page, 0)
    this.result = page.match(/^[0-9a-fA-F]{0,3}$/)
      ? {
          page: parseInt(page, 16),
          pageHex: parseInt(page, 16).toString(16).toUpperCase(),
        }
      : charCodeInfo(code)
    return this
  }

  then(call) {
    call({
      result: this.result,
    })
    return this
  }
}
