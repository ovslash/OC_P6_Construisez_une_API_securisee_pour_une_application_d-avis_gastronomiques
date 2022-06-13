const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sauceCtrl = require("../controllers/sauce");

//--------------------------------------------------------------

// route pour afficher toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauce);

// route pour afficher une seule sauce en fonction de son ID
router.get("/:id", auth, sauceCtrl.getOneSauce);

// route pour la creation d'une sauce
router.post("/", auth, multer, sauceCtrl.createSauce);

// route pour modifier une sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);

// route pour supprimer une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);

//--------------------------------------------------------------

module.exports = router;
