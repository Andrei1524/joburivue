import express from "express";
const router = express.Router();
import { authenticateJWT } from "../middleware/authenticateJWT";

import * as JobController from "../controllers/job.controller";

router.post(
  "/create",
  authenticateJWT,
  JobController.createJobValidate,
  JobController.create
);

export = router;