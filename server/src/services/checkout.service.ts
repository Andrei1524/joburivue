import Job from '../model/job.model';
import Plan from '../model/plan.model';
import { normalPlan, boostedPlan, proPlan } from '../seeds/seedPlans';
import { planTypes } from '../ts/types/plan.types';
const agenda = require('./_agenda.service');

async function handlePaymentCompleted(payload: any) {
  try {
    const [jobID, selectedPlan] = payload.client_reference_id.split('/');
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
  }).populate('plan._id');

  // if user is renewing to the same plan, dont create a new plan
  if (foundJob!.plan._id && selectedPlan === foundJob!.plan._id.name) {
    const foundPlan = await Plan.findById(foundJob!.plan._id);

    if (
      foundPlan! &&
      foundPlan!._id.toString() === foundJob!.plan._id._id.toString()
    ) {
      // renew plan
      foundJob!.plan.isPlanActive = true;
      foundPlan!.isPlanActive = true;
      foundPlan!.updatedAt = new Date().toISOString();

      await foundPlan!.save();
      await foundJob!.save();
      await schedulePlanExpire(foundPlan, foundJob);
    }
  } else {
    // TODO: handle this better instead of duplicating code
    // TODO: expire old plan is renewing to a better plan
    switch (selectedPlan) {
      case 'NORMAL':
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
      case 'BOOSTED':
        boostedPlan.save(async function (err, savedDoc) {
          if (err) {
            return err;
          }

          foundJob!.plan._id = savedDoc._id;
          foundJob!.plan.isPlanActive = savedDoc.isPlanActive;

          await foundJob!.save();
          await schedulePlanExpire(savedDoc, foundJob);
        });
        break;
      case 'PRO':
        proPlan.save(async function (err, savedDoc) {
          if (err) {
            return err;
          }

          foundJob!.plan._id = savedDoc._id;
          foundJob!.plan.isPlanActive = savedDoc.isPlanActive;

          await foundJob!.save();
          await schedulePlanExpire(savedDoc, foundJob);
        });
        break;
    }
  }
}

async function schedulePlanExpire(plan: any, job: any) {
  try {
    await agenda.schedule(plan.expireDate, 'schedule_plan_expire', {
      plan_id: plan._id,
      job_id: job._id,
    });
  } catch (error) {
    console.log(error);
  }
}

export { handlePaymentCompleted };
