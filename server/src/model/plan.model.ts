import { Schema, model } from "mongoose";
import { PlanInterface } from "../ts/interfaces/plan.interfaces";

const PlanSchema = new Schema<PlanInterface>({
  name: { type: String, required: true },
  expireDate: { type: String, required: true },
  promotedOnSocialChannels: { type: Boolean, required: false },
  listedOnWeeklyNewsletter: { type: Boolean, required: false },
  jobPinnedInSearches: { type: Boolean, required: false },
  jobShowedInRecommendedCompanies: { type: Boolean, required: false },
});

const Plan = model<PlanInterface>("Plan", PlanSchema);
export = Plan;
