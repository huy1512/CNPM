const express = require("express");
const controller = require("../controllers/user_controller");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);

module.exports = router;
