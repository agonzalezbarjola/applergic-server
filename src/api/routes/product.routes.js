const ProductRoutes = require("express").Router();
const { isAuth } = require("../../middleware/auth");
const {
  getProduct,
  getProductByCode,
  getProductById,
} = require("../controllers/product.controller");


ProductRoutes.get("/", [isAuth], getProduct);
ProductRoutes.get("/favorites", [isAuth], getProductById);
ProductRoutes.get("/:code", [isAuth], getProductByCode);




module.exports = ProductRoutes;
