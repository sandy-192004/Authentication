const express = require("express");
const router = express.Router();

const { registerDetail, loginDetail, dashPage } = require("./controller");
const AuthMiddleware = require("./middleware/authmiddleware");  

// Routes
router.post("/register", registerDetail);
router.post("/login", loginDetail);
router.get("/dashboard", AuthMiddleware, dashPage);  

module.exports = router;
