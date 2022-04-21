import express from "express";
const router = express.Router();
import { authenticateJWT } from "../middleware/authenticateJWT";

import * as TagController from "../controllers/tag.controller";

router.post("/create", authenticateJWT, TagController.create);
router.get("/", TagController.getAll);

export = router;
