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

const createPlan = (jobId: string, selectedPlan: string) => {
  switch (selectedPlan) {
    case "NORMAL":
      return new Plan({
        jobId,
        expireDate: add_days(new Date(), normalPlanDays).toISOString(),
        ...normalPlanSettings,
      });
    case "BOOSTED":
      return new Plan({
        jobId,
        expireDate: add_days(new Date(), normalPlanDays).toISOString(),
        ...boostedPlanSettings,
      });
    case "PRO":
      return new Plan({
        jobId,
        expireDate: add_days(new Date(), normalPlanDays).toISOString(),
        ...proPlanSettings,
      });
  }
};

function returnSeedPlan(selectedPlan: string, jobId: string) {
  return createPlan(jobId, selectedPlan);
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
