import Job from "../model/job.model";
import { normalPlan, boostedPlan, proPlan } from "../seeds/seedPlans";
import { planTypes } from "../ts/types/plan.types";
const agenda = require("./_agenda.service");

async function handlePaymentCompleted(payload: any) {
  try {
    const [userId, selectedPlan] = payload.client_reference_id.split("-");

    // fullfill job create on succesfull payment
    await handleActionsOnSelectedPlan(selectedPlan, userId);

    return true;
  } catch (error) {
    throw (error as Error).message;
  }
}

async function handleActionsOnSelectedPlan(
  selectedPlan: planTypes,
  userId: string
) {
  const foundJob = await Job.findOne({
    createdBy: userId,
  });

  switch (selectedPlan) {
    case "NORMAL":
      normalPlan.save(async function (err, savedDoc) {
        if (err) {
          console.log(err);
          return err;
        }

        foundJob!.plan._id = savedDoc._id;
        foundJob!.plan.isPlanActive = savedDoc.isPlanActive;

        await foundJob!.save();
        await schedulePlanExpire(savedDoc, foundJob);
      });
      break;
    case "BOOSTED":
      boostedPlan.save(async function (err, savedDoc) {
        if (err) {
          return err;
        }

        foundJob!.plan = savedDoc._id;
        foundJob!.plan.isPlanActive = savedDoc.isPlanActive;

        await foundJob!.save();
        await schedulePlanExpire(savedDoc, foundJob);
      });
      break;
    case "PRO":
      proPlan.save(async function (err, savedDoc) {
        if (err) {
          return err;
        }

        foundJob!.plan = savedDoc._id;
        foundJob!.plan.isPlanActive = savedDoc.isPlanActive;

        await foundJob!.save();
        await schedulePlanExpire(savedDoc, foundJob);
      });
      break;
  }
}

async function schedulePlanExpire(plan: any, job: any) {
  try {
    await agenda.schedule(plan.expireDate, "schedule_plan_expire", {
      plan_id: plan._id,
      job_id: job._id,
    });
  } catch (error) {
    console.log(error);
  }
}

export { handlePaymentCompleted };
