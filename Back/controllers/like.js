// logique métier appliquée à la route like

const Sauce = require("../models/sauce");

exports.modifyLike = (req, res, next) => {
  // recharde de l'id de la sauce et de l'utilisateur
  const like = req.body.like;
  const userId = req.body.userId;

  Sauce.findOne({ _id: req.params.id })

    .then((sauce) => {
      // creation témoin de présence de l'utilisateur dans les tableaux recapitulatifs
      let userLike = sauce.usersLiked.find((id) => id === userId);
      let userDislike = sauce.usersDisliked.find((id) => id === userId);

      // Si la requete envoi 1
      if (like === 1) {
        if (!userLike) {
          sauce.likes += 1;
          sauce.usersLiked.push(userId);
        }
      }

      // Si la requete envoi -1
      if (like === -1) {
        if (!userDislike) {
          sauce.dislikes += 1;
          sauce.usersDisliked.push(userId);
        }
      }

      // Si la requete envoi 0
      if (like === 0) {
        if (!userDislike) {
          sauce.likes -= 1;
          sauce.usersLiked.remove(userId);
        } else {
          sauce.dislikes -= 1;
          sauce.usersDisliked.remove(userId);
        }
      }
      // sauvegarde de la sauce avec le statut de "like"
      sauce
        .save()
        .then(() =>
          res.status(201).json({ message: "préférence enregistrée !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};
