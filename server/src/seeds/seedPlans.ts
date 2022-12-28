import { mongoConnect, mongoDisconnect } from "../services/_mongo.service";
import Plan from "../model/plan.model";

const add_days = function (date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const normalPlanDays = 35;
const NORMAL = (jobId: string) =>
  new Plan({
    name: "NORMAL",
    jobId,
    expireDate: add_days(new Date(), normalPlanDays).toISOString(),
    planDays: normalPlanDays,
    isPlanActive: true,
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: false,
    jobPinnedInSearches: false,
    jobShowedInRecommendedCompanies: false,
  });

const boostedPlanDays = 60;
const BOOSTED = (jobId: string) =>
  new Plan({
    name: "BOOSTED",
    jobId,
    expireDate: add_days(new Date(), boostedPlanDays).toISOString(),
    planDays: boostedPlanDays,
    isPlanActive: true,
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: true,
    jobPinnedInSearches: true,
    jobShowedInRecommendedCompanies: false,
  });

const proPlanDays = 60;
const PRO = (jobId: string) =>
  new Plan({
    name: "PRO",
    jobId,
    expireDate: add_days(new Date(), proPlanDays).toISOString(),
    planDays: proPlanDays,
    isPlanActive: true,
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: true,
    jobPinnedInSearches: true,
    jobShowedInRecommendedCompanies: true,
  });

function returnSeedPlan(selectedPlan: string, jobId: string) {
  switch (selectedPlan) {
    case "NORMAL":
      return NORMAL(jobId);
    case "BOOSTED":
      return BOOSTED(jobId);
    case "PRO":
      return PRO(jobId);
  }
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
