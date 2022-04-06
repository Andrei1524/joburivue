import express from "express";
const router = express.Router();

import * as AuthController from "../controllers/auth.controller";

router.post("/login", AuthController.loginValidate, AuthController.login);
router.post(
  "/register",
  AuthController.registerValidate,
  AuthController.register
);

module.exports = router;
