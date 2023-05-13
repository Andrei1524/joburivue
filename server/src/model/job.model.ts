import { Schema, model } from 'mongoose';
import { JobInterface } from '../ts/interfaces/job.interfaces';
// Schema.Types.ObjectId
//Types.ObjectId

const JobSchema = new Schema<JobInterface>(
  {
    jobId: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    type: { type: String, required: true },
    level: { type: String, required: false },
    description: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: false }],
    location: { type: String, required: true },
    remoteType: { type: String, required: false },
    applicationTarget: { type: String, required: true },
    currency: { type: String, required: true },
    minSalary: { type: Number, required: false },
    maxSalary: { type: Number, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: Object, required: false },
  },
  { timestamps: true }
);

JobSchema.index({ '$**': 'text' });

const Job = model<JobInterface>('Job', JobSchema);
export = Job;
