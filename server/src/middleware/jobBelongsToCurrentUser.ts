import _ from "lodash";
import { NextFunction, Request, Response } from "express";
import Job from "../model/job.model";
import { authenticateJWT } from "./authenticateJWT";

const jobBelongsToCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { createdBy } = req.body;
  const { jobId, option } = req.params;

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
    next();
  }
};

export = jobBelongsToCurrentUser;
