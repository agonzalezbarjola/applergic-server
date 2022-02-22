const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { setError } = require("../../utils/errors/error");
const { generateSign, verifyJwt } = require("../../utils/jwt/jwtUtils");

const postNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ email: newUser.email });
    if (userDuplicate) {
      return next(setError(404, "Email existente"));
    }
    if (req.file) {
      newUser.image = req.file.path;
    }
    const userDB = await newUser.save();
    return res.status(201).json({ userID: userDB._id });
  } catch (error) {
    return next(setError(500, "No se ha podido registrar"));
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      return res.status(200).json({ token: token, userDB: userDB });
    }
  } catch (error) {
    error.message = "error Login";
    return next(setError(500, "No se ha podido logear"));
  }
};

const logoutUser = (req, res, next) => {
  try {
    const despedida = "Bye Bye";
    const token = null;
    return res.status(200).json({ token: token, message: despedida });
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDB = await User.findById(id).populate("fav");
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    return res.status(200).json({ userDB: userDB });
  } catch (error) {
    return next(setError(404, "User server fail"));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const userDB = await User.find().populate("fav");
    if (!userDB) {
      return next(setError(404, "User not found"));
    }
    return res.status(200).json({ userDB: userDB });
  } catch (error) {
    return next(setError(404, "User server fail"));
  }
};

const patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchUser = new User(req.body);
    patchUser._id = id;

    // const { favorite } = req.body;

    // const change = { fav: favorite };

    // const patchUser = new User(req.body.fav, id);

    // patchUser._id = id;

    const userDB = await User.findByIdAndUpdate(id, {$addToSet: {fav: patchUser.fav}});

    //aqui abajo son las respeustas
    if (!userDB) {
      return next(setError(404, "product not found"));
    }
    if (userDB)
      return res.status(200).json({
        new: patchUser,
        old: userDB,
        req: req.body,
        patchUser: patchUser.fav,
      });
  } catch (error) {
    return next(setError(500, "User patch server error"));
  }
};

const deleteFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { idProduct } = req.params;

    const userDB = await User.update(
      { _id: id },
      { $pull: { fav: idProduct } }
    );

    //aqui abajo son las respeustas
    if (!userDB) {
      return next(setError(404, "Error while update user"));
    }
    if (userDB) return res.status(200).json({userDB: userDB, idProduct: idProduct});
  } catch (error) {
    return next(setError(500, "User patch server error"));
  }
};

module.exports = {
  postNewUser,
  loginUser,
  logoutUser,
  getUser,
  getAllUsers,
  patchUser,
  deleteFavorite,
};
