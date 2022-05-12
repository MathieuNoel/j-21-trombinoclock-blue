// require("dotenv").config();
const { Client } = require("pg");

// si je modifie mon .env je dois redémarrer mon serveur pour que les changements prennent effet.
const client = new Client(process.env.PG_URL);
client.connect();

const promoController = {
  // je peux mettre un _ "underscore" sur un parametre que je ne vais pas utiliser

  promosList: (_, res) => {
    // je nomme ma variable explicitement ici c'est une requete SQL
    const sqlQuery = 'SELECT * FROM "promo"';
    //callback function
    // client.query(sqlQuery, (error, result) => {
    //   if (error) {
    //     console.log(error);
    //     // j'oublie pas d'envoyer une erreur si la requete se passe mal
    //   res.status(500).send(error.message);
    //   } else {
    //     console.log(result.rows);
    //     // je render ma view promos et je lui envoie les resultats de ma requete SQL
    //     res.render("promos", { promos: result.rows });
    //   }
    // });

    //! en promesse avec .then

    client
      .query(sqlQuery)
      .then((data) => {
        const promos = data.rows;
        res.render("promos", { promos });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error.message);
      });
  },

  // promoDetail: (req, res, next) => {
  //   // mode parsint
  //   // const id = parseInt(req.params.id, 10);
  //   // version Number
  //   const id = Number(req.params.id);
  //   // const sqlQuery = 'SELECT * FROM "promo" WHERE id =' + id;

  //   // let promo;
  //   // for (const currentPromo of promos) {
  //   //   if (currentPromo.id === id) {
  //   //     selectedPromo = promo;
  //   //     // pour arreter ma boucle
  //   //     break;
  //   //   }
  //   // };

  //   // version one liner Une ligne
  //   const promo = promos.find((promotion) => promotion.id === id);

  //   // premiere facon avec un if else
  //   // if (promo) {
  //   //   res.render("promo", { promo });
  //   // } else {
  //   //   next();
  //   // }

  //   if (!promo) {
  //     return next();
  //   }

  //   res.render("promo", { promo });

  //   // meme chose avec un retour implicite
  //   // promo = promos.find((candidat) => {
  //   //   return candidat.id === id
  //   // })
  // },

  //! mode promesse
  promoDetail: (req, res, next) => {
    const promoId = Number(req.params.id);
    const sqlQuery = `SELECT * FROM "promo" WHERE id = ${promoId}`;

    client
      .query(sqlQuery)
      .then((result) => {
        // console.log(result.rows, "DATA");

        //todo rajouter commentaire sur le ! logique
        //! !maVariable va checker la valeur de <maVariable> si celle-ci vaut Undefined, Null, NaN, 0 ou "" alors il renverra true;
        //! cela nous permet du coup de savoir si une valeur existe ou pas dans notre cas.
        //! un tableau vide n'est pas null ou undefined car si on le console.log cela nous renvoie un tableau vide []
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_Operators

        // si le resultat de ma requerte est vide j'envoie sur le prochaine middleware
        // en l'occurrence la page 404 et j'oublie pas le return pour sortir de ma fonction
        if (result.rows.length === 0) {
          return next();
        }
        // j'ai un resultat je veux que le premier de mon tableau
        // je le mets dans une constante et je l'envoie à ma vue
        const promo = result.rows[0];
        res.render("promo", { promo });
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },
};

module.exports = promoController;
