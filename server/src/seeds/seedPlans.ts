import { mongoConnect, mongoDisconnect } from "../services/_mongo.service";
import Plan from "../model/plan.model";

const plans = [
  new Plan({
    name: "NORMAL",
    activeDuration: "35",
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: false,
    jobPinnedInSearches: false,
    jobShowedInRecommendedCompanies: false,
  }),
  new Plan({
    name: "BOOSTED",
    activeDuration: "60",
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: true,
    jobPinnedInSearches: true,
    jobShowedInRecommendedCompanies: false,
  }),
  new Plan({
    name: "PRO",
    activeDuration: "60",
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: true,
    jobPinnedInSearches: true,
    jobShowedInRecommendedCompanies: true,
  }),
];

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

export { startSeedingPlans };
