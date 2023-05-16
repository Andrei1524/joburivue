import { Schema, model } from 'mongoose';
import { CompanyInterface } from '../ts/interfaces/company.interfaces';

const CompanySchema = new Schema<CompanyInterface>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: false },
    website: { type: String, required: false },
    description: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    storageId: { type: String, required: false },
  },

  { timestamps: true }
);
CompanySchema.index({ '$**': 'text' });

const Company = model<CompanyInterface>('Company', CompanySchema);
export = Company;
