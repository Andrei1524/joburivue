import { NextFunction, Request, Response } from "express";
import Job from "../model/job.model";
import { authenticateJWT } from "./authenticateJWT";
import _ from "lodash";

const jobBelongsToCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { createdBy } = !_.isEmpty(req.body) ? req.body : req.query;
  const { jobId, option } = req.params || req.query;

  // TODO: add options to TS types
  if (option === "edit" || option === "preview" || option === "checkout") {
    await authenticateJWT(req, res, async () => {
      const foundJob = await Job.findOne({ jobId }).lean();

      if (
        foundJob &&
        foundJob!.createdBy.toString() === req.user._id.toString()
      ) {
        next();
      } else {
        return res.sendStatus(401);
      }
    });
  } else if (createdBy) {
    if (createdBy === req.user._id.toString()) {
      next();
    } else {
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  }
};

export = jobBelongsToCurrentUser;
