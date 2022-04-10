import { Types } from "mongoose";
interface JobInterface {
  title: string;
  type: string;
  level: string;
  description: string;
  tags: [Types.ObjectId];
  location: string;
  remoteType: string;
  howToApply: string;
  applicationTarget: string;
  currency: Types.ObjectId;
  minSalary: number;
  maxSalary: number;
}

export { JobInterface };
