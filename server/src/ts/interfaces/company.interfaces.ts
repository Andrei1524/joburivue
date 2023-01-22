import { Types } from "mongoose";

interface CompanyInterface {
  _id?: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;

  createdBy: Types.ObjectId;
}

export { CompanyInterface };
