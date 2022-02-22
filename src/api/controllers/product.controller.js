const Product = require("../models/product.model");
const { setError } = require("../../utils/errors/error");

const getProduct = async (req, res, next) => {
  try {
    // res.send(req.query.codes)
    const code = req.query.codes
    const productDb = await Product.find({ code: { $in: code } });
    console.log(productDb);
    if (!productDb) {
      return next(setError(404, "Product not found"));
    }
    return res.status(200).json({ res: productDb,});
  } catch (error) {
    return next(setError(500, "Product server error"));
  }
};

const getProductById = async (req, res, next) => {
  try {
    // res.send(req.query.codes)
    const id = req.query.id
    const productDb = await Product.find({ _id: { $in: id } });
    console.log(productDb);
    if (!productDb) {
      return next(setError(404, "Product not found"));
    }
    return res.status(200).json({ res: productDb });
  } catch (error) {
    return next(setError(500, "Product server error"));
  }
};

const getProductByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const productDb = await Product.find({code: code});
    console.log(productDb);
    if (!productDb) {
      return next(setError(404, "Product not found"));
    }
    return res.status(200).json(productDb);
  } catch (error) {
    return next(setError(500, "Product server error"));
  }
};



module.exports = { getProduct, getProductByCode, getProductById};
