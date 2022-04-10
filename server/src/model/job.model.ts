import { Schema, model } from "mongoose";
import { JobInterface } from "../ts/interfaces/job.interfaces";
// Schema.Types.ObjectId
//Types.ObjectId

const JobSchema = new Schema<JobInterface>({
  title: {
    type: String,
    required: true,
  },
  type: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: true },
  location: { type: String, required: true },
  howToApply: { type: String, required: true },
  applicationTarget: { type: String, required: true },
  currency: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
});

const Job = model<JobInterface>("Job", JobSchema);
export = Job;
