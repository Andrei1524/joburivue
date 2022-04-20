import { NextFunction, Request, Response } from "express";
import * as JobService from "../services/job.service";
const { check, validationResult } = require("express-validator");
import { pageLimit } from "../config";

type remoteTypes = "work_remotely" | "remote_only";

const createJobValidate = [
  check("title")
    .exists()
    .withMessage("Jobul trebuie sa contina un titlu!")
    .isLength({ min: 8 })
    .withMessage("Titlul trebuie sa fie de cel putin 8 caractere!")
    .trim()
    .escape(),
  check("type")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Specificati tipul jobului!"),
  check("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Adaugati o descriere!"),
  check("location")
    .custom((value: string, { req }: any) => {
      if (value && value.length > 0) {
        return true;
      } else {
        return req.body.remoteType === "remote_only";
      }
    }) // TODO: add remote types to a TS types
    .withMessage("Locatia este necesara daca jobul este optional remote!"),
  check("applicationTarget")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Adaugati p metoda de aplicare!"),
];

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const job = await JobService.create({ ...payload, createdBy: req.user });
    return res.status(200).json(job);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

async function getJobs(req: Request, res: Response, next: NextFunction) {
  try {
    const page = req.query.page ? req.query.page : 1;
    const searchString = req.query.search;

    const { jobs, total_items } = await JobService.getJobs(
      searchString,
      Number(page),
      pageLimit
    );

    return res.status(200).json({ data: jobs, total_items, pageLimit });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { create, getJobs, createJobValidate };
