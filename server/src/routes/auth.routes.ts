import express from "express";
const router = express.Router();
import { authenticateJWT } from "../middleware/authenticateJWT";

import * as AuthController from "../controllers/auth.controller";

router.post("/login", AuthController.loginValidate, AuthController.login);
router.post(
  "/register",
  AuthController.registerValidate,
  AuthController.register
);
router.get("/me", authenticateJWT, AuthController.getCurrentUser);

module.exports = router;
