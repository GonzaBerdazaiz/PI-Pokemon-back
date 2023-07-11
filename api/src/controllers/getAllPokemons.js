const axios = require("axios");
const {Pokemon, Type} = require("../db")

//TRAEMOS POKEMON DE LA API
const getPokemonApi = async()=>{
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151");
    const pokemonUrls = response.data.results.map(pokemon => pokemon.url);

    const pokemonResponses = await Promise.all(pokemonUrls.map(url => axios.get(url)));

    const pokemonList = pokemonResponses.map(pokemonResponse => ({
        id: pokemonResponse.data.id,
        name: pokemonResponse.data.name,
        image: pokemonResponse.data.sprites.front_default,
        hp: pokemonResponse.data.stats[0].base_stat,
        attack: pokemonResponse.data.stats[1].base_stat,
        defense: pokemonResponse.data.stats[2].base_stat,
        speed: pokemonResponse.data.stats[5].base_stat,
        height: pokemonResponse.data.height,
        weight: pokemonResponse.data.weight,
        types: pokemonResponse.data.types.map((type) => ({
            name: type.type.name
        })),
        created: false,
    }));
    return pokemonList;
}
    
//TRAEMOS POKEMON DE LA BD
const getPokemonDB = async()=>{ 
    const dbPokemon = await Pokemon.findAll({
        include: {
          model: Type,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
    });
    return dbPokemon;
}

//CONCATENAMOS 
const getAllPokemons = async()=>{
    const ApiPokemons = await getPokemonApi();
    const DBPokemons = await getPokemonDB();
    return [...ApiPokemons, ...DBPokemons];
}
    
module.exports = getAllPokemons;