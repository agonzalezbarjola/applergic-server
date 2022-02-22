const mongoose = require("mongoose");

const allergenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Allergen = mongoose.model("Allergen", allergenSchema);
module.exports = Allergen;
