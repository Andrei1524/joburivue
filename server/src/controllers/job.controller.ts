import { NextFunction, Request, Response } from "express";
import * as JobService from "../services/job.service";
const { check, validationResult } = require("express-validator");
import Job from "../model/job.model";

const jobValidate = [];

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    return res.status(200).json("job created");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { create };
