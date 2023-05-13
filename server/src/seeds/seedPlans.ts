import { mongoConnect, mongoDisconnect } from '../services/_mongo.service';

const add_days = function (date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const normalPlanDays = 35;
const normalPlanSettings = {
  name: 'NORMAL',
  planDays: normalPlanDays,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: false,
  jobPinnedInSearches: false,
  jobShowedInRecommendedCompanies: false,
};

const boostedPlanDays = 60;
const boostedPlanSettings = {
  name: 'BOOSTED',
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: false,
  planDays: boostedPlanDays,
};

const proPlanDays = 60;
const proPlanSettings = {
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
  }
}

export { returnPlanSettings };
