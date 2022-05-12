require("dotenv").config();

const express = require("express");
const router = require("./app/router");

const app = express();

// je peux définir un port directement dans la configuration d'express
// avec app.set
// app.set("port", 3000);

// je peux définir directement un port pour lancer mon serveur express.
// j'ai défini ma variable d'environnement dans mon .env et je vais la chercher dans process.env.<Nom de ma variable>

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./public"));

app.use(router);

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});
