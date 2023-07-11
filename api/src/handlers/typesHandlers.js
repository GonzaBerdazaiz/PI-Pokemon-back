const getTypes = require("../controllers/typesControllers");

const getTypesHandler = async(req,res) =>{
    try{
        const getAllTypes = await getTypes();
        res.status(200).json(getAllTypes);
    } catch(error){
        res.status(404).send(error.message);
    }
}

module.exports = getTypesHandler;