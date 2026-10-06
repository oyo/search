export class LensHandler {
  delay = 50
  name = 'LensHandler'

  patterns = {
    test: /^lens$/i,
  }

  help() {
    return {
      name: 'Lens',
      description: 'Lens example',
      examples: [
        {
          name: 'Lens',
          expr: 'lens',
        },
      ],
    }
  }

  evaluate(expr) {
    return this.patterns.test.test(expr) ? 0.99 : 0
  }

  search(expr) {
    this.expr = expr
    this.data = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' //'/img/shape-org.png'
    return this
  }

  then(call) {
    call({
      result: this.data,
    })
    return this
  }
}
