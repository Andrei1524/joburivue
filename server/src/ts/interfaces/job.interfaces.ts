import { Types } from "mongoose";
import { CompanyInterface } from "./company.interfaces";
import { jobTypeTypes } from "../types/job.types";

interface JobInterface {
  _id: string;
  title: string;
  company: CompanyInterface;
  type: jobTypeTypes;
  level: string;
  description: string;
  tags: [string];
  location: string;
  remoteType: string;
  howToApply: string;
  applicationTarget: string;
  currency: string | Types.ObjectId;
  minSalary: number;
  maxSalary: number;
}

export { JobInterface };
