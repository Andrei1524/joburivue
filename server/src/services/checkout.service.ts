import Job from "../model/job.model";
import Plan from "../model/plan.model";
import { returnSeedPlan } from "../seeds/seedPlans";
import { planTypes } from "../ts/types/plan.types";
const agenda = require("./_agenda.service");

async function handlePaymentCompleted(payload: any) {
  try {
    const [jobID, selectedPlan] = payload.client_reference_id.split("/");
    // fullfill job create on succesfull payment
    return await handleActionsOnSelectedPlan(selectedPlan, jobID);
  } catch (error) {
    throw (error as Error).message;
  }
}

async function handleActionsOnSelectedPlan(
  selectedPlan: planTypes,
  jobID: string
) {
  const foundJob = await Job.findOne({
    jobId: jobID,
  }).populate("plan._id");
  console.log({ selectedPlan });

  // if user is renewing to the same plan, don't create a new plan
  if (
    foundJob &&
    foundJob.plan._id &&
    selectedPlan === foundJob.plan._id.name
  ) {
    const foundPlan = await Plan.findById(foundJob.plan._id);

    if (
      foundPlan &&
      foundPlan._id.toString() === foundJob.plan._id._id.toString()
    ) {
      // renew plan
      foundJob.plan.isPlanActive = true;
      foundPlan.isPlanActive = true;
      foundPlan.updatedAt = new Date().toISOString();
      foundPlan.expireDate = add_days(
        new Date(),
        foundPlan.planDays
      ).toISOString();

      await foundPlan.save();
      await foundJob.save();
      await schedulePlanExpire(foundPlan, foundJob);
    }
  } else {
    returnSeedPlan(selectedPlan, foundJob!._id)?.save(async function (
      err,
      savedDoc
    ) {
      if (err) {
        console.log(err);
        return err;
      }

      foundJob!.plan._id = savedDoc._id;
      foundJob!.plan.isPlanActive = savedDoc.isPlanActive;

      await foundJob!.save();
      await schedulePlanExpire(savedDoc, foundJob);
    });
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

const add_days = function (date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export { handlePaymentCompleted };
