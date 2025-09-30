const express = require("express");
const router = express.Router();
const controller = require("../controllers/product_controller");

router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.post("/", controller.createProduct);

module.exports = router;
