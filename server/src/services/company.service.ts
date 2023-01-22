import Company from "../model/company.model";
import { CompanyInterface } from "../ts/interfaces/company.interfaces";
import { Request } from "express";

async function create(payload: CompanyInterface, req: Request) {
  try {
    const filePath = req.file ? req.file.path : "";

    if (payload._id) {
      return await Company.findOneAndUpdate(
        { _id: payload._id },
        { ...payload, logo: filePath },
        {
          new: true,
        }
      );
    } else {
      return new Company({ ...payload, logo: filePath }).save();
    }
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create };
