import { Types } from "mongoose";
interface PlanInterface {
  name: string;
  promotedOnSocialChannels: boolean;
  listedOnWeeklyNewsletter: boolean;
  jobPinnedInSearches: boolean;
  jobShowedInRecommendedCompanies: boolean;
  expireDate: string;
  isPlanActive: boolean;
  boughtBy: Types.ObjectId;
}

export { PlanInterface };
