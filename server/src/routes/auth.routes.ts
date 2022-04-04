import express from "express";
const router = express.Router();

import * as AuthController from "./../controllers/auth.controllers";

router.post("/login", AuthController.login);

module.exports = router;
