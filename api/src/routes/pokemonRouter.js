const { Router } = require("express");
const {allPokemonsHandler, pokemonByIdHandler, pokemonCreatedHandler} = require("../handlers/PokemonsHandler");
const pokemonRouter = Router();

pokemonRouter
.get("/", allPokemonsHandler)
.post("/", pokemonCreatedHandler)
.get("/:id", pokemonByIdHandler) 

module.exports = pokemonRouter;