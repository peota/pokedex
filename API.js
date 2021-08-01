const axios = require('axios');

module.exports = class API {

    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2'
    }

    async getPokemons(offset, limit) {
        const url = `${this.baseUrl}/pokemon?offset=${offset || 0}&limit=${limit || 10}`
        return await this.sendRequest(url)
    }

    async getPokemon(name) {
        const url = `${this.baseUrl}/pokemon/${name}`
        return await this.sendRequest(url)
    }

    async sendRequest(url) {
        const response = await axios.get(url)
        return response.status === 200 ?
            response.data
            : false
    }
}

