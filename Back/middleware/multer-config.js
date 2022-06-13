// Gestion des fichiers reçus

const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  // destination du fichier image
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  // nom du fichier image
  filename: (req, file, callback) => {
    // remplacement des " " par "_" dans le nom du fhichier
    const name = file.originalname.split(" ").join("_");
    // mise en place extension du fichier
    const extension = MIME_TYPES[file.mimetype];
    // assemblage du nom - Date.now() > pour rendre le nom du fichier plus précis
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
