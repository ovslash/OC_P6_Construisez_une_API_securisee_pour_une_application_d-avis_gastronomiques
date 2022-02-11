//

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const sauceRoutes = require("./routes/sauce");
const likeRoutes = require("./routes/like");
const userRoutes = require("./routes/user");

const path = require("path");

//--------------------------------------------------------------

// variables d'environnement             Pas utilisé dans le cadre du projet
// const dotenv = require("dotenv");
// dotenv.config();

// const BDD_USER = process.env.BDD_USER;
const BDD_USER = "user79";

// const BDD_PASSWORD = process.env.BDD_PASSWORD;
const BDD_PASSWORD = "user79";

//const BDD_NAME = process.env.BDD_NAME;
const BDD_NAME = "myFirstDatabase";

//--------------------------------------------------------------

// connexion à la base de données

mongoose
  .connect(
    `mongodb+srv://${BDD_USER}:${BDD_PASSWORD}@cluster0.fplvd.mongodb.net/${BDD_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//--------------------------------------------------------------

// transformation corps requeteen objet JS
app.use(express.json());

// résolution problème de CORS et accès à l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// pour la gestion statique - images
app.use("/images", express.static(path.join(__dirname, "images")));

// routes utilisées
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/sauces", likeRoutes);

//--------------------------------------------------------------

module.exports = app;
