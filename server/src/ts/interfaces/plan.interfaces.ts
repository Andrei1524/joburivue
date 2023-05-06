import { Types } from "mongoose";
interface PlanInterface {
  name: string;
  jobId: string;
  promotedOnSocialChannels: boolean;
  listedOnWeeklyNewsletter: boolean;
  jobPinnedInSearches: boolean;
  promotedOnWeeklyNewsletter: boolean;
  jobShowedInRecommendedCompanies: boolean;
  expireDate: string;
  planDays: number;
  isPlanActive: boolean;
  boughtBy: Types.ObjectId;
  updatedAt: string;
}

export { PlanInterface };
