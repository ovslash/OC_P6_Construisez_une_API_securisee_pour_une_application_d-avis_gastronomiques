// validation des entrées pour éviter les attaques d'injonction

const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    email: { type: "string", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" },
    password: {
      type: "string",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

module.exports = (req, res, next) => {
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).json({
      error:
        "Email doit être valide et mot de passe doit contenir au moins 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre",
    });
  } else {
    next();
  }
};

// --------------------------------------------------------------------------------------------
