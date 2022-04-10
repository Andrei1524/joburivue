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
  level: { type: String, required: false },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  location: { type: String, required: true },
  remoteType: { type: String, required: false },
  howToApply: { type: String, required: true },
  applicationTarget: { type: String, required: true },
  currency: { type: String, required: false },
  minSalary: { type: Number, required: false },
  maxSalary: { type: Number, required: false },
});

const Job = model<JobInterface>("Job", JobSchema);
export = Job;
