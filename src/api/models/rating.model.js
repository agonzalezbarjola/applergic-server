const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema(
  {
    rating: { type: Number },
    /*  user: {type: mongoose.Types.ObjectId, ref: 'User'}, */
  },
  {
    timestamp: true,
  }
);

const Rating = mongoose.model("rating", ratingsSchema);
module.exports = Rating;
