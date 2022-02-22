const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  validationPassword,
  validationPhone,
} = require("../../utils/validators/validations");
const { setError } = require("../../utils/errors/error");

const userSchema = new mongoose.Schema(
  {
    image: { type: String },
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    phone: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
      email: { type: String },
      insurance: {
        company: { type: String },
        noPolicy: { type: String },
      },
    },
    allergens: [{ type: mongoose.Types.ObjectId, ref: "Allergens" }],
    fav: [{ type: mongoose.Types.ObjectId, ref: "Products", unique: true }],
    diaryList: [
      {
        product: { type: mongoose.Types.ObjectId, ref: "Products" },
        date: { type: String, default: Date.now },
        notes: { type: String },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!validationPassword(this.password)) {
    return next(setError(400, "La contraseña no tiene los minimos requeridos"));
  } else if (!validationPhone(this.phone)) {
    return next(
      setError(400, "Este número no cumple con el formato (1234567890)")
    );
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
