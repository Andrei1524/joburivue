import express from "express";
const router = express.Router();

import { login } from "./../controllers/auth.controllers";

router.post("/login", login);

module.exports = router;
