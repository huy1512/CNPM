const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment_controller");

router.post("/process", controller.processPayment);

module.exports = router;
