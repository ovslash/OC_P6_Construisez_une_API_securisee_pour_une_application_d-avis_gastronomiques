const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");

// route pour la gestion du bouton LIKE
router.post("/:id/like", auth, likeCtrl.modifyLike);

module.exports = router;
