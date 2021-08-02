const Pokemon = require('./Pokemon')
const API = require('./API')
const pokemonDB = require('./Pokemons')

class Pokedex {

    constructor() {
        this.API = new API()
        this.pokemonDB = pokemonDB
    }

    // getting a single Pokemon by his name
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

    // getting multiple Pokemon's  with paging ability
    async getPokemons(offset, limit) {

        // prepare results array
        const pokemonsArray = []

        try {
            // get pokemons data (name and url)
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


    // checking if Pokemon is exist in Pokedex database
    isPokemonExist(name) {
        const findPokemon = this.pokemonDB
            .find(p => p.toLowerCase() === name.toLowerCase())
        return findPokemon ? true : false
    }
}

window.Pokedex = new Pokedex();
// const x = new Pokedex()
// x.getPokemons(0,5).then(data=>console.log(data))

