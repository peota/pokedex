module.exports = class Pokemon {

    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.image = `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`;
    }

}

