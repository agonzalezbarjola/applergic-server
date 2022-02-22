const RatingRoutes = require("express").Router();
const { isAuth } = require("../../middleware/auth");
const { getRating, postRating } = require("../controllers/rating.controller");

RatingRoutes.get("/ratings", [isAuth], getRating);
RatingRoutes.post("/vote", [isAuth], postRating);



module.exports = RatingRoutes;
