const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema (
{
    name: { type: String, required: true},
    brand: { type: String, required: true},
    image: { type: String,},
    allergens:[{ type: Schema.Types.ObjectId, ref:"Allergen"}],
    ingredients:{ type: String, required: true},
    code: { type: String, required: true}
    
},
{
    timestamps: true,
  }

)
const Products = mongoose.model ('Products',productSchema);

module.exports = Products