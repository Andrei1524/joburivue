import Job from "../model/job.model";
import { JobInterface } from "../ts/interfaces/job.interfaces";

async function create(payload: JobInterface) {
  try {
    return "create job";
  } catch (error) {
    throw (error as Error).message;
  }
}
export { create };
