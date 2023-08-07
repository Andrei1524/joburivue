const add_days = function (date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const normalPlanDays = 35;
const boostedPlanDays = 60;
const proPlanDays = 60;

// TODO: refactor these from a base job, and just extend
const normalPlanSettings = {
  expireDate: add_days(new Date(), normalPlanDays).toUTCString(),
  planRenewed: new Date().toUTCString(),
  name: 'NORMAL',
  planDays: normalPlanDays,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: false,
  jobPinnedInSearches: false,
  jobShowedInRecommendedCompanies: false,
};

const boostedPlanSettings = {
  expireDate: add_days(new Date(), boostedPlanDays).toUTCString(),
  planRenewed: new Date().toUTCString(),
  name: 'BOOSTED',
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: false,
  planDays: boostedPlanDays,
};

const proPlanSettings = {
  expireDate: add_days(new Date(), proPlanDays).toUTCString(),
  planRenewed: new Date().toUTCString(),
  name: 'PRO',
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: true,
  planDays: proPlanDays,
};

function returnPlanSettings(selectedPlan: string) {
  switch (selectedPlan) {
    case 'NORMAL':
      return normalPlanSettings;
    case 'BOOSTED':
      return boostedPlanSettings;
    case 'PRO':
      return proPlanSettings;

    default:
      throw Error('No plan string returned');
  }
}

export { returnPlanSettings };
