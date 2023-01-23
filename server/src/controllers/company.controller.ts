import { NextFunction, Request, Response } from "express";
import * as CompanyService from "../services/company.service";
const { check, validationResult } = require("express-validator");

import { CompanyInterface } from "../ts/interfaces/company.interfaces";

const createCompanyValidate = [
  check("name")
    .exists()
    .withMessage("Compania trebuie sa contina un titlu")
    .trim()
    .escape(),
];

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const company = await CompanyService.create(payload, req);
    return res.status(200).json(company);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

async function getUserCompanies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const companies = await CompanyService.getUserCompanies(req);

    return res.status(200).json(companies);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

export { create, getUserCompanies, createCompanyValidate };
