import Company from "../model/company.model";
import { CompanyInterface } from "../ts/interfaces/company.interfaces";
import { Request } from "express";
import Job from "../model/job.model";

async function create(payload: CompanyInterface, req: Request) {
  try {
    const filePath = req.file ? req.file.path : "";

    if (payload._id) {
      return await Company.findOneAndUpdate(
        { _id: payload._id },
        { ...payload, logo: filePath || payload.logo, createdBy: req.user },
        {
          new: true,
        }
      );
    } else {
      return new Company({
        ...payload,
        logo: filePath,
        createdBy: req.user,
      }).save();
    }
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getUserCompanies(req: Request) {
  try {
    const data: unknown = Company.find({ createdBy: req.user._id });

    return data;
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create, getUserCompanies };
