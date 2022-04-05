import express from "express";
const router = express.Router();

import * as AuthController from "./../controllers/auth.controllers";

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
