import Job from '../model/job.model';
import { returnPlanSettings } from '../seeds/seedPlans';
import { planTypes } from '../ts/types/plan.types';

async function handlePaymentCompleted(payload: any) {
  try {
    const [jobID, selectedPlan] = payload.client_reference_id.split('/');
    // fullfill job create on succesfull payment
    return await handleActionsOnSelectedPlan(jobID, selectedPlan);
  } catch (error) {
    throw (error as Error).message;
  }
}

async function handleActionsOnSelectedPlan(
  jobID: string,
  selectedPlan: planTypes
) {
  const foundJob = await Job.findOne({
    jobId: jobID,
  }).populate('company');

  if (foundJob) {
    const plan = returnPlanSettings(selectedPlan);

    foundJob!.plan = plan;
    await foundJob!.save();
  }
}

export { handlePaymentCompleted };
