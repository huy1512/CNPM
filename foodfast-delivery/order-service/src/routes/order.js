const express = require("express");
const controller = require("../controllers/order_controller");

const router = express.Router();

router.post("/", controller.createOrder);
router.get("/", controller.getOrders);
router.get("/:id", controller.getOrderById);

module.exports = router;
