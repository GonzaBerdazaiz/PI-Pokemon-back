const {Pokemon, Type} = require("../db")
const axios = require("axios");
const { Op } = require("sequelize"); //operadores de sequelize

const getPokemonsByNameBD = async(name) =>{
    const pokemonByNameBD = await Pokemon.findAll({
        where: {name: {
            [Op.iLike]: `%${name}%`,
          }},
        include: [{
            model: Type,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }]
    })
    return [...pokemonByNameBD];
}

const getPokemonsByNameApi = async(name) =>{
    try {
        const response = [];
        name = name.toLowerCase();
        const filteredByNamePokemons = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (filteredByNamePokemons.data) {
            response.push({
                id: filteredByNamePokemons.data.id,
                name: filteredByNamePokemons.data.name,
                image: filteredByNamePokemons.data.sprites.front_default,
                hp: filteredByNamePokemons.data.stats[0].base_stat,
                attack: filteredByNamePokemons.data.stats[1].base_stat,
                defense: filteredByNamePokemons.data.stats[2].base_stat,
                speed: filteredByNamePokemons.data.stats[3].base_stat,
                height: filteredByNamePokemons.data.height,
                weight: filteredByNamePokemons.data.weight,
                types: filteredByNamePokemons.data.types.map((t) => { return {name: t.type.name}}),
                created: false,
        })};
        return response;
    } catch (error){
        return [];
    }
}

const getPokemonsByName = async(name)=>{

    const DBPokemons = await getPokemonsByNameBD(name);
    const APIPokemons = await getPokemonsByNameApi(name);
    
    const pokemonsName = [...DBPokemons, ...APIPokemons];
    return pokemonsName
}

module.exports = getPokemonsByName;