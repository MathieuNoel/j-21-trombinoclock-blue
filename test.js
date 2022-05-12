const { Client } = require("pg");

// une instance de Client
const client = new Client("postgresql://etudiant:js4life@pg.oclock.lan/trombi");
// excellent candidat pour une variable d'environnement
//! <protocole>://<user>:<password>@<host>/<bdd_name>

client.connect();

// cela me revoie une promesse... mais rien, j'ai besoin de lui
// donner une fonciton callback pour lui dire quoi faire
//une fois la requete effectuée
// const result = client.query('SELECT * FROM "promo"');
// console.log(result);

// j'ai besoin de lui envoyer une fonction de callback pour lui dire quoi faire
// quand il aura terminé d'exécuter ma requete SQL
// j'aurais alors soit une erreur soit des resultats et je pourrais bosser avec

client.query('SELECT * FROM "promo"', (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(result.rows);
  }

  client.end();
});
