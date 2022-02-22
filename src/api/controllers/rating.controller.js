const Rating = require('../models/rating.model')
const { setError } = require("../../utils/errors/error");

const getRating = async (req, res, next) => {
    try {
      const ratingDb = await Rating.find();
      if (!ratingDb) {
        return next(setError(404, "Rating not found"));
      }
      return res.status(200).json(ratingDb);
    } catch (error) {
      return next(setError(500, "Rating server error"));
    }
  };

  
  const postRating  = async (req, res, next) => {
    try {
        const newRating = new Rating(req.body)
        const ratingDB = await newRating.save()
        return res.status(201).json({ rating: ratingDB.rating })

    } catch (error) {
        return next(setError(404, "Rating not sent"));
    }
}

  module.exports = { 
      
    getRating, postRating,
 };