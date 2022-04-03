const express = require("express");
const router = express.Router();

import * as AuthControllers from "./../controllers/auth.controllers";

router.post("/login", AuthControllers.login);

export { router };
