const mongoose = require("mongoose");

const mongoDb =
  "mongodb+srv://root:root@cluster0.6b5az.mongodb.net/applergicdb?retryWrites=true&w=majority";
const AllergensModel = require("../src/api/models/allergen.model");

const Allergens = [
  {
    name: "cereales",
  },
  {
    name: "crustáceos",
  },
  {
    name: "huevos",
  },
  {
    name: "pescado",
  },
  {
    name: "cacahuetes",
  },
  {
    name: "soja",
  },
  {
    name: "leche",
  },
  {
    name: "apio",
  },
  {
    name: "mostaza",
  },
  {
    name: "sésamo",
  },
  {
    name: "dióxido de azufre y sulfitos",
  },
  {
    name: "altramuces",
  },
  {
    name: "moluscos",
  },
  {
    name: "frutos secos",
  },
  {
    name: "gluten",
  },     
  {
    name: "maiz",
  },
];

const AllergensDocument = Allergens.map(
  (allergen) => new AllergensModel(allergen)
);

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allAllergen = await AllergensModel.find();
    if (allAllergen.length) {
      await AllergensModel.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting allergens: ${err}`))
  .then(async () => {
    await AllergensModel.insertMany(AllergensDocument);
    console.log("Allergens successfully created");
  })
  .catch((err) => console.log(`Error creating Allergens: ${err}`))
  .finally(() => mongoose.disconnect());
