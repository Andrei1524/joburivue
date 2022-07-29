import { Types } from 'mongoose';
import { CompanyInterface } from './company.interfaces';
import { jobTypeTypes } from '../types/job.types';

interface JobInterface {
  _id: string;
  jobId: string;
  title: string;
  company: CompanyInterface;
  type: jobTypeTypes;
  level: string;
  description: string;
  tags: [string];
  location: string;
  remoteType: string;
  applicationTarget: string;
  currency: string;
  minSalary: number;
  maxSalary: number;
  createdBy: Types.ObjectId;
  plan: any;
  params: any;
}

export { JobInterface };
