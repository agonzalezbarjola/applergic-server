const Allergen = require("../models/allergen.model");

const { setError } = require("../../utils/errors/error");

  
const getAllergens = async (req, res, next) => {
    try {
      const allergenDb = await Allergen.find();
      res.status(200).json(allergenDb);
    } catch (error) {
      return next(setError(500, "Allergen failed server"));
    }
  };

  module.exports ={

    getAllergens,
    
  } 