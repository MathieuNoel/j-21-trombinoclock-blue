const { Client } = require("pg");

const client = new Client(process.env.PG_URL);
client.connect();

const studentController = {
  // studentList: (req, res, next) => {
  //   // je récupère l'id de mes params dans ma requete req et je m'assure qu'il s'agit bien d'un nombre
  //   //
  //   const promoId = Number(req.params.id);

  //   // j'ai besoin de trouver la bonne promo donc j'utilise un .find
  //   // le .find va faire une boucle dans chaque element de mon tableau
  //   // une fois qu'il aura trouvé le PREMIER element correspondant à ma condition dans ma function call back
  //   // alors il me renverra cet element et stoppera la boucle
  //   // donc ici dés que l'id de la promo sera égal à l'id reçu en paramètre il s'arretera et renverra cette promo.
  //   const selectedPromo = promos.find((promotion) => promotion.id === promoId);

  //   // je fais de la programmation défensive je vérifie si je récupère bien une promo
  //   // si oui alors je peux continuer et filtrer mes étudiants
  //   // sinon je délègue au middleware 404 avec mon next()
  //   if (selectedPromo) {
  //     // j'ai besoin de filtrer les étudiants d'une seule promo.
  //     // le .filter boucle comme le .find mais ne s'arrete pas au premier élement trouvé
  //     // il va lire chaque element et mettre de coté dans un tableau chaque element répondant favorablement
  //     // à ma condition dans ma function callback
  //     // puis il me renverra tous ces élements dans un nouveau tableau
  //     // ici dés que le numéro de la promo d'un étudiant est égal à mon promoID alors il le stock dans un tableau

  //     const studentOfPromos = students.filter((student) => {
  //       return student.promo === promoId;
  //     });

  //     // je renvoie ma promo et mes étudiants.
  //     res.render("promoStudents", {
  //       promo: selectedPromo,
  //       students: studentOfPromos,
  //     });
  //   } else {
  //     // je délégue au prochain middleware, le fameux qui gère la route 404
  //     next();
  //   }
  // },

  studentList: (req, res, next) => {
    const promoId = Number(req.params.id);
    const sqlQueryPromo = `SELECT * FROM "promo" WHERE id = ${promoId}`;

    client
      .query(sqlQueryPromo)
      .then((result) => {
        if (result.rows.length === 0) {
          return next();
        }

        // je fais d'abord une premiere requete pour récupérer la bonne promo avec son id
        // une requete SQL me renvoit FORCEMENT un tableau
        // j'ai besoin ici que d'une seule promo du coup je récupere l'index 0 de mon tableau
        // pour avoir uniquement l'objet contenant ma promo.
        const selectedPromo = result.rows[0];

        const queryStudent = `SELECT * FROM "student" WHERE promo_id = ${promoId}`;

        // je fais ma deuxieme requete pour récupérer tous les étudiants de la promo id envoyé en parametre
        // je render ensuite ma promo reçu lors de ma premiere requete et mes étudiants issus de la deuxieme requete.
        client.query(queryStudent).then((studentResult) => {
          console.log(studentResult.rows);
          // const students = studentResult.rows;
          res.render("promoStudents", {
            promo: selectedPromo,
            students: studentResult.rows,
          });
        });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  },
};

module.exports = studentController;
