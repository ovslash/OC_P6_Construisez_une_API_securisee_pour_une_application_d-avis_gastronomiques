// routes UTILISATEUR

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const checkInputUser = require("../middleware/check-inputs-user");

//--------------------------------------------------------------

// route pour s'enregistrer
router.post("/signup", checkInputUser, userCtrl.signup);

// route pour se connecter
router.post("/login", checkInputUser, userCtrl.login);

//--------------------------------------------------------------

module.exports = router;
