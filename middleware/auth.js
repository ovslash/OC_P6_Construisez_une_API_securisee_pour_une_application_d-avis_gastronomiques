// verification utilisateur pour routes sécurisées

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // recupération de la clé générée
    const token = req.headers.authorization.split(" ")[1];
    //decodage de la clé
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // recupération de l'ID dans le TOKEN
    const userId = decodedToken.userId;
    // recupération de l'ID dans la requete
    req.auth = { userId };

    // comparaison des ID et actions
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
