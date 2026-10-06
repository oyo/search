export class PokemonHandler {
  delay = 300
  name = 'PokemonHandler'

  patterns = {
    test: /^[a-zA-Z-]{3,20}$/i,
  }

  help() {
    return {
      name: 'Pokémon',
      description: 'Search for Pokémon by name',
      examples: [
        {
          name: 'Name',
          expr: 'bulb',
        },
      ],
    }
  }

  evaluate(expr) {
    return this.patterns.test.test(expr) ? 0.9 : 0
  }

  async search(expr) {
    this.expr = expr.toLowerCase()
    const data = await fetch(`data/pokemon.json`)
    const pokemonList = await data.json()
    this.result = pokemonList.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.expr),
    )
    if (this.result.length === 1) {
      const detailData = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.result[0].name}`)
      const pokemonDetail = await detailData.json()
      this.result = pokemonDetail
    }
    return this
  }

  then(call) {
    call({
      result: this.result,
    })
    return this
  }
}
