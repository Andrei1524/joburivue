import { mongoConnect, mongoDisconnect } from "../services/_mongo.service";
import Plan from "../model/plan.model";

const add_minutes = function (dt: Date, minutes: number) {
  return new Date(dt.getTime() + minutes * 60000);
};

const normalPlanDays = 35;
const normalPlan = new Plan({
  name: "NORMAL",
  expireDate: add_minutes(new Date(), 2).toISOString(),
  isPlanActive: true,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: false,
  jobPinnedInSearches: false,
  jobShowedInRecommendedCompanies: false,
});

const boostedPlanDays = 60;
const boostedPlan = new Plan({
  name: "BOOSTED",
  expireDate: add_minutes(new Date(), 2).toISOString(),
  isPlanActive: true,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: false,
});

const proPlanDays = 60;
const proPlan = new Plan({
  name: "PRO",
  expireDate: add_minutes(new Date(), 2).toISOString(),
  isPlanActive: true,
  promotedOnSocialChannels: true,
  listedOnWeeklyNewsletter: true,
  promotedOnWeeklyNewsletter: true,
  jobPinnedInSearches: true,
  jobShowedInRecommendedCompanies: true,
});

const plans = [normalPlan, boostedPlan, proPlan];

async function startSeedingPlans() {
  try {
    await mongoConnect();

    await Plan.deleteMany({});

    plans.map(async (plan, index) => {
      await plan.save(async (err, result) => {
        if (index === plans.length - 1) {
          console.log("SEEDED PLANS!");
          await mongoDisconnect();
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export { normalPlan, boostedPlan, proPlan, startSeedingPlans };
