import _ from "lodash";
import { NextFunction, Request, Response } from "express";
import Job from "../model/job.model";
import { authenticateJWT } from "./authenticateJWT";

const isSameUser = async (req: Request, res: Response, next: NextFunction) => {
  const { createdBy } = req.body;
  const { jobId, option } = req.params;

  if (option === "edit") {
    await authenticateJWT(req, res, async () => {
      const foundJob = await Job.findOne({ jobId }).lean();

      if (foundJob!.createdBy.toString() === req.user._id.toString()) {
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

export = isSameUser;
