import Job from '../model/job.model';
import Plan from '../model/plan.model';
import { returnSeedPlan } from '../seeds/seedPlans';
import { planTypes } from '../ts/types/plan.types';

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

  if (foundJob) {
    returnSeedPlan(selectedPlan, foundJob!._id)?.then(async (returnedPlan) => {
      foundJob!.plan._id = returnedPlan!._id!;
      foundJob!.plan.isPlanActive = returnedPlan!.isPlanActive;

      await returnedPlan!.save();
      await foundJob!.save();
    });
  }
}

export { handlePaymentCompleted };
