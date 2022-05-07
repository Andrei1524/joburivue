import express from "express";
const bodyParser = require("body-parser");
const router = express.Router();

import * as CheckoutController from "../controllers/checkout.controller";
router.post(
  "/",
  express.raw({ type: "application/json" }),
  CheckoutController.webhoock
);

export = router;
