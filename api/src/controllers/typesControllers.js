const axios = require("axios");
const {Type} = require("../db");

const getTypes = async() =>{
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type")
    const tiposApi = typesApi.data.results.map((e)=>e.name);
    for (const types of tiposApi) {
        await Type.findOrCreate({ where: { name: types }, });
    }
    const typeDB = await Type.findAll();
    return typeDB;
}

module.exports = getTypes;
