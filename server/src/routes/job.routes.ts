import express from 'express';
const router = express.Router();
import { authenticateJWT } from '../middleware/authenticateJWT';
import jobBelongsToCurrentUser from '../middleware/jobBelongsToCurrentUser';

import * as JobController from '../controllers/job.controller';

router.post(
  '/create',
  authenticateJWT,
  jobBelongsToCurrentUser,
  JobController.createJobValidate,
  JobController.create
);

router.get('/', JobController.getJobs);
router.get('/:jobId/:option?', jobBelongsToCurrentUser, JobController.getJob);

export = router;
