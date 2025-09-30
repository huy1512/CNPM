const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment_controller");

router.get("/", controller.getAllPayments);
router.get("/:id", controller.getPaymentById);
router.post("/process", controller.processPayment);
router.delete("/:id", controller.deletePayment);

module.exports = router;
