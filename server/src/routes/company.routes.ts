import express from 'express';
const router = express.Router();
import { authenticateJWT } from '../middleware/authenticateJWT';

import * as CompanyController from '../controllers/company.controller';

router.post(
  '/create',
  authenticateJWT,
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
