import express from "express";
const router = express.Router();

import * as CheckoutController from "../controllers/checkout.controller";
router.post("/", CheckoutController.webhoock);

export = router;
