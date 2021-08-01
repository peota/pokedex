const Pokemon = require('./Pokemon')
const API = require('./API')
const pokemonsList = require('./Pokemons')

class Pokedex {

    constructor() {
        this.API = new API()
        this.pokemonsList = pokemonsList
    }

    async getPokemon(name) {
        // check if name specified
        if (!name)
            return 'No Pokemon Selected'

        // init
        name = name.toLowerCase()

        // check if pokemon exist
        if (!this.isPokemonExist(name))
            return 'Pokemon Not Found'

        // get pokemon data
        try {
            const data = await this.API.getPokemon(name)
            return new Pokemon(data.name, data.id)
        } catch (e) {
            console.log(e)
            return { status: 'error', message: e }
        }
    }

    async getPokemons(offset, limit) {

        // prepare results array
        const pokemonsArray = []

        try {
            // get pokemons general data
            const data = await this.API.getPokemons(offset, limit)

            // get each pokemon details
            for (let pokemon of data.results) {
                const data = await this.getPokemon(pokemon.name)
                pokemonsArray.push(new Pokemon(data.name, data.id))
            }
            return pokemonsArray
        } catch (e) {
            console.log(e)
            return { status: 'error', message: e }
        }
    }

    isPokemonExist(name) {
        const findPokemon = this.pokemonsList.
            find(p => p.toLowerCase() === name.toLowerCase())
        return findPokemon ? true : false
    }
}

window.Pokedex = new Pokedex();
// const x = new Pokedex()
// x.getPokemons(0,5).then(data=>console.log(data))

