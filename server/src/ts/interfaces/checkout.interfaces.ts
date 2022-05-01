interface normalPlanInterface {
  planName: string;
  jobActiveDuration: string;
  listedOnSocialChannels: boolean;
  listedOnWeeklyNewsletter: boolean;
}

interface boostedPlanInterface {
  planName: string;
  jobActiveDuration: string;
  promotedOnSocialChannels: boolean;
  listedOnWeeklyNewsletter: boolean;
  jobPinnedInSearches: boolean;
}

interface proPlanInterface {
  planName: string;
  jobActiveDuration: string;
  promotedOnSocialChannels: boolean;
  listedOnWeeklyNewsletter: boolean;
  jobPinnedInSearches: boolean;
  jobShowedInRecommendedCompanies: boolean;
}
export { normalPlanInterface, boostedPlanInterface, proPlanInterface };
