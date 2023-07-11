const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRouter = require("./typeRouter");
const pokemonRouter = require("./pokemonRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/types", typeRouter);
router.use("/pokemon", pokemonRouter); // ante cualquier peticion a /pokemon, que vaya a pokemonRouter

module.exports = router;
