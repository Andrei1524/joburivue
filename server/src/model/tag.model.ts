import { Schema, model } from "mongoose";
import { TagInterface } from "../ts/interfaces/tag.interfaces";

const JobSchema = new Schema<TagInterface>({
  name: { type: String, required: true },
});

JobSchema.index({ "$**": "text" });

const Job = model<TagInterface>("Job", JobSchema);
export = Job;
