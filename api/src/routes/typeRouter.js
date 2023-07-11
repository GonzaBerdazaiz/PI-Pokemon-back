const { Router } = require("express");
const getTypesHandler = require("../handlers/typesHandlers");

const typeRouter = Router();

typeRouter.get("/", getTypesHandler);

module.exports = typeRouter;