import { Schema, model } from 'mongoose';
import { CompanyInterface } from '../ts/interfaces/company.interfaces';

const CompanySchema = new Schema<CompanyInterface>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: false },
    website: { type: String, required: false },
    description: { type: String, required: true },
  },

  { timestamps: true }
);

const Company = model<CompanyInterface>('Company', CompanySchema);
export = Company;
