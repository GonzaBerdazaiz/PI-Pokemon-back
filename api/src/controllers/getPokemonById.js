const axios = require("axios");
const {Pokemon, Type} = require("../db")

const getPokemonByIdBD = async(id) =>{
  const pokeBD = await Pokemon.findByPk(id, {
    include: [
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return pokeBD;
}
    
const getPokemonByIdApi = async(id) => {
  const pokeApi = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (pokeApi) {
    let p = pokeApi;
    return {
      id: p.data.id,
      name: p.data.name,
      image: p.data.sprites.other.dream_world.front_default,
      hp: p.data.stats[0].base_stat,
      attack: p.data.stats[1].base_stat,
      defense: p.data.stats[2].base_stat,
      speed: p.data.stats[3].base_stat,
      height: p.data.height,
      weight: p.data.weight,
      types: p.data.types.map((t) => { return {name: t.type.name}}),
      created: false,
    }; 
  }
}

const getPokemonById = async(id) =>{
  if (!isNaN(id)) { // Si es NaN es de la DB, sino, el id va a ser de la API xq de ahi trae no numero, un UUID.
    const PokemonId = await getPokemonByIdApi(id);
    return PokemonId;
  } else {
    const PokemonId = await getPokemonByIdBD(id);
    return PokemonId;
  }
};

module.exports = getPokemonById;
