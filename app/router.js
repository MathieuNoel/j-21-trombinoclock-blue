const express = require("express");

const mainController = require("./controller/mainController");
const promoController = require("./controller/promoController");
const studentController = require("./controller/studentController");

const router = express.Router();

router.get("/", mainController.homeRender);

router.get("/promos", promoController.promosList);

router.get("/promos/:id", promoController.promoDetail);

router.get("/promos/:id/students", studentController.studentList);

router.use(mainController.error404);

module.exports = router;
