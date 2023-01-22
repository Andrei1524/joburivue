import express from "express";
const router = express.Router();
import { authenticateJWT } from "../middleware/authenticateJWT";

import * as CompanyController from "../controllers/company.controller";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post(
  "/create",
  authenticateJWT,
  upload.single("logoFile"),
  CompanyController.createCompanyValidate,
  CompanyController.create
);

// router.get('/', JobController.getJobs);

// router.get(
//   '/userJobs',
//   authenticateJWT,
//   jobBelongsToCurrentUser,
//   JobController.getJobs
// );

// router.get('/:jobId/:option?', jobBelongsToCurrentUser, JobController.getJob);

export = router;
