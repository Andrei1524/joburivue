import Job from '../model/job.model';
import { returnPlanSettings } from '../seeds/seedPlans';
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
    // TODO: only update expire date
    // if the job is found only update the plan inside the Job
  }
}

export { handlePaymentCompleted };
