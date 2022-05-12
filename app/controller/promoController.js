// require("dotenv").config();
const { Client } = require("pg");

// si je modifie mon .env je dois redémarrer mon serveur pour que les changements prennent effet.
const client = new Client(process.env.PG_URL);
client.connect();

const promoController = {
  // je peux mettre un _ "underscore" sur un parametre que je ne vais pas utiliser

  promosList: async (req, res) => {
    try {const sqlQuery = 'SELECT * FROM "promo"';
    const results = await client.query(sqlQuery);  
    res.render("promos", { promos : results.rows }) 
    } catch (error) {

    }
  },

  promoDetail: async (req, res, next) => {
    try {    
      const promoId = Number(req.params.id);
      const sqlQuery = `SELECT * FROM "promo" WHERE id = ${promoId}`;
      const results = await client.query(sqlQuery);
      res.render("promo", { promo : results.rows[0]})
      
    } catch (error) {
      next()
    }  
  },
};

module.exports = promoController;
