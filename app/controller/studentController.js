const { Client } = require("pg");

const client = new Client(process.env.PG_URL);
client.connect();

const studentController = {
  studentList: async (req, res, next) => {
    try {   
    const promoId = Number(req.params.id);
    const sqlQueryPromo = `SELECT * FROM "promo" WHERE id = ${promoId}`;
    const promo = await client.query(sqlQueryPromo);
    const queryStudent = `SELECT * FROM "student" WHERE promo_id = ${promoId}`;
    const students = await client.query(queryStudent);
    res.render("promoStudents", {
      promo : promo.rows[0] ,
      students : students.rows
    })      
    } catch (error) {
      console.log(error)
    }     
  },
};

module.exports = studentController;
