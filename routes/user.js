// routes UTILISATEUR

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

//--------------------------------------------------------------

// route pour s'enregistrer
router.post("/signup", userCtrl.signup);

// route pour se connecter
router.post("/login", userCtrl.login);

//--------------------------------------------------------------

module.exports = router;
