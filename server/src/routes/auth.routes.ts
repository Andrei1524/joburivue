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
router.post("/logout", AuthController.logout);
router.post("/refresh_token", AuthController.refreshToken);
router.get("/me", authenticateJWT, AuthController.getCurrentUser);

export = router;
