import { Types } from "mongoose";
import { CompanyInterface } from "./company.interfaces";

interface JobInterface {
  _id: string;
  title: string;
  company: CompanyInterface;
  type: string;
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
