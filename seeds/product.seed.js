const mongoose = require("mongoose");

const mongoDb =
  "mongodb+srv://root:root@cluster0.6b5az.mongodb.net/applergicdb?retryWrites=true&w=majority";
const ProductsModel = require("../src/api/models/product.model");


const Products =[

    {
        name: " Cacao soluble",
        brand: " Cola-Cao",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644398839/colacao_loh8rl.png",
        allergens:[`62016789e13a56ee70ede394`,`6203848cd028adc8cf0eeae8`],
        ingredients:"Azúcar, Cacao desgrasado en polvo, Crema de cereal kola-malteado (Harina de trigo, Extracto de malta de cebada, Aroma natural: Extracto de nuez de cola), Sales minerales (calcio y fésforo), Aromas, Sal, PUEDE CONTENER LECHE,",
        code: "8410014478733"
    },
    {
        name: "Refresco de Cola",
        brand: " Coca-cola",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644398846/Cocacola_xomiuq.png",
        allergens:[],
        ingredients:"Agua carbonatada, azúcar, colorante: E-150d, acidulante: ácido fosfórico y aromas naturales (incluyendo cafeína).",
        code: "5449000000996"
    },

    {
        name: "Galletas con crema de vainilla",
        brand: "Oreo",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644398842/Oreo_ibefsk.png",
        allergens:[`6203848cd028adc8cf0eeae8`,`6203848cd028adc8cf0eeae0`,`6203848cd028adc8cf0eeadf`],
        ingredients:"Ingredientes: Harina de TRIGO, azúcar, grasa de palma, aceite de nabina, cacao magro en polvo 4,3 %, almidón de TRIGO, jarabe de glucosa y fructosa, gasificantes (carbonatos de amonio, carbonatos de potasio, carbonatos de sodio), sal, emulgente (lecitinas de SOJA), corrector de acidez (hidróxido sódico), aroma. PUEDE CONTENER LECHE.",
        code: "7622300744663"
    },
    {
        name: "Macarrones",
        brand: "carrefuuu",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644398964/Macarrones_oa8wzd.png",
        allergens:[`6203848cd028adc8cf0eeae8`],
        ingredients:"Sémola de trigo duro",
        code: "3560071015152"
    },
    {
        name: "Leche Desnatada",
        brand: "Hacendado",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644399449/leche-desnatada_akx1wg.png",
        allergens:[`6203848cd028adc8cf0eeae0`],
        ingredients:"Leche desnatada de vaca",
        code: "8480000107800"
    },
    {
        name: "Galletas rellenas cacao",
        brand: "Hacendado",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644401859/rellenas_dugluw.png",
        allergens:["6203848cd028adc8cf0eeae0", "6203848cd028adc8cf0eeae4","6203848cd028adc8cf0eeae8"],
        ingredients:"Harina de trigo (gluten), azúcar, aceite de palma, aceite refinado de girasol, cacao desgrasado en polvo (5%), suero lácteo en polvo (leche), almidón de maíz, jarabe de glucosa, proteínas de leche, sal, gasificantes (carbonato ácido de sodio y carbonato ácido de amonio), emulgente (lecitina de girasol), aroma, agente de tratamiento de la harina (metabisulfito sódico (sulfitos)).",
        code: "8480000141576"
    },
    {
        name: "Paté ibérico",
        brand: "Casa Tarradellas",
        image: "https://res.cloudinary.com/dkv0drgbb/image/upload/v1644400210/pate-iberico_tvibf9.png",
        allergens:[`6203848cd028adc8cf0eeae0`],
        ingredients:"Carne e hígado de cerdo ibérico (65%). leche descremada. sal. especias. aromas. antioxidante (ascorbato sódico). conservador (nitrito sódico). Sin colorantes ni fécula.",
        code: "8410762120168"

    },

];

const ProductsDocument = Products.map(
    (product) => new ProductsModel(product)
  );
  mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(async () => {
    const allProducts = await ProductsModel.find();
    if (allProducts.length) {
      await ProductsModel.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting products: ${err}`))
  .then(async () => {
    await ProductsModel.insertMany(ProductsDocument);
    console.log("Products successfully created");
  })
  .catch((err) => console.log(`Error creating products: ${err}`))
  .finally(() => mongoose.disconnect());


  
