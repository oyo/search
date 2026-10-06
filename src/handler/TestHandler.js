export class TestHandler {
  delay = 50
  name = 'TestHandler'

  patterns = {
    test: /^test$/i,
  }

  help() {
    return {
      name: 'Test',
      description: 'Test features',
      examples: [
        {
          name: 'Test',
          expr: 'test',
        },
      ],
    }
  }

  evaluate(expr) {
    return this.patterns.test.test(expr) ? 0.99 : 0
  }

  search(expr) {
    this.expr = expr.toLowerCase()
    return this
  }

  then(call) {
    call({
      result: this.expr,
    })
    return this
  }
}
