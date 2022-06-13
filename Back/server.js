// code serveur

const http = require("http");
const app = require("./app");

//--------------------------------------------------------------

// Pour la securité
const helmet = require("helmet");
app.use(helmet());

// Pour luter contre les attaques de force brut
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  // nombre de requetes max
  max: 100,
  // wtemps durant lequel un utilisateur le comptage de requetes est fait
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});
app.use(limiter);

//--------------------------------------------------------------

// gestion port
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

// recherche et gestion des erreurs
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// recharche et affichage port utilisé
const server = http.createServer(app);
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
