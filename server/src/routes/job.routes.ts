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

router.get("/", JobController.getJobs);
router.get("/:jobId", JobController.getJob);

export = router;
