import { mongoConnect, mongoDisconnect } from "../services/_mongo.service";
import Plan from "../model/plan.model";

const add_days = function (date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const normalPlanDays = 35;
const normalPlanSettings = {
  name: "NORMAL",
  planDays: normalPlanDays,
  isPlanActive: true,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: false,
  jobPinnedInSearches: false,
  jobShowedInRecommendedCompanies: false,
};

const boostedPlanDays = 60;
const boostedPlanSettings = {
  name: "BOOSTED",
  isPlanActive: true,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: false,
  planDays: boostedPlanDays,
};

const proPlanDays = 60;
const proPlanSettings = {
  name: "PRO",
  isPlanActive: true,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: true,
  planDays: proPlanDays,
};

function returnPlanSettings(selectedPlan: string) {
  switch (selectedPlan) {
    case "NORMAL":
      return normalPlanSettings;
    case "BOOSTED":
      return boostedPlanSettings;
    case "PRO":
      return proPlanSettings;
  }
}

const createPlan = async (selectedPlan: string, jobId: string) => {
  const foundPlan = await Plan.findOne({ jobId }).exec();

  if (foundPlan && foundPlan.isPlanActive) {
    foundPlan.expireDate = add_days(
      new Date(),
      returnPlanSettings(selectedPlan)!.planDays
    ).toISOString();
    foundPlan.name = returnPlanSettings(selectedPlan)!.name;
    foundPlan.isPlanActive = returnPlanSettings(selectedPlan)!.isPlanActive;
    foundPlan.promotedOnSocialChannels =
      returnPlanSettings(selectedPlan)!.promotedOnSocialChannels;
    foundPlan.listedOnWeeklyNewsletter =
      returnPlanSettings(selectedPlan)!.listedOnWeeklyNewsletter;
    foundPlan.promotedOnWeeklyNewsletter =
      returnPlanSettings(selectedPlan)!.promotedOnWeeklyNewsletter;
    foundPlan.jobPinnedInSearches =
      returnPlanSettings(selectedPlan)!.jobPinnedInSearches;
    foundPlan.jobShowedInRecommendedCompanies =
      returnPlanSettings(selectedPlan)!.jobShowedInRecommendedCompanies;
    foundPlan.planDays = returnPlanSettings(selectedPlan)!.planDays;

    return foundPlan;
  } else {
    return new Plan({
      jobId,
      expireDate: add_days(new Date(), normalPlanDays).toISOString(),
      ...returnPlanSettings(selectedPlan),
    });
  }
};

async function returnSeedPlan(selectedPlan: string, jobId: string) {
  return await createPlan(selectedPlan, jobId);
}

// async function startSeedingPlans() {
//   try {
//     await mongoConnect();
//
//     await Plan.deleteMany({});
//
//     plans.map(async (plan, index) => {
//       await plan.save(async (err, result) => {
//         if (index === plans.length - 1) {
//           console.log("SEEDED PLANS!");
//           await mongoDisconnect();
//         }
//       });
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

export { returnSeedPlan };
