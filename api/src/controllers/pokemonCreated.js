const {Pokemon, Type} = require("../db");

const pokemonCreated = async(name, hp, attack, defense, speed, height, weight, image, types) => {
    const postPokemon = await Pokemon.create({
        name: name,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
        image: image
    });
    const pokemonTypes = await Type.findAll({
        where: { id: types},
        })
    await postPokemon?.addType(pokemonTypes);  
    return postPokemon;
}

module.exports = pokemonCreated;