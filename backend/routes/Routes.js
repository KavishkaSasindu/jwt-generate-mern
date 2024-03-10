const express = require("express");
const router = express.Router();
const UserAuthController = require("../controller/UserAuthController");

router.post("/signUp", UserAuthController.userCreate);

module.exports = router;
