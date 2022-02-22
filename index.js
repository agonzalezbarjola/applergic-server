const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const UserRoutes = require("./src/api/routes/user.routes");
const AllergenRoutes = require("./src/api/routes/allergen.routes");
const RatingRoutes = require("./src/api/routes/rating.routes");
const ProductRoutes = require("./src/api/routes/product.routes");

const { setError } = require("./src/utils/errors/error");

const { connect } = require("./src/utils/database/db");

const PORT = process.env.PORT || 8080;

const app = express();

connect();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200", 'https://applergic-front-i7nc81inr-agonzalezbarjola.vercel.app'],
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "5mb",
  })
);
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/allergens", AllergenRoutes);
app.use("/api/ratings", RatingRoutes);
app.use("/api", (req, res, next) => {
  return res.json("Bienvenida-Api");
});

app.use("*", (req, res, next) => {
  return next(setError(404, "Route not found"));
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
