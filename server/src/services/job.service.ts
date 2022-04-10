import Job from "../model/job.model";

import { JobInterface } from "../ts/interfaces/job.interfaces";

async function create(payload: JobInterface) {
  try {
    const newJob = await new Job({
      title: payload.title,
      company: payload.company,
      type: payload.type,
      level: payload.level,
      description: payload.description,
      tags: payload.tags,
      location: payload.location,
      remoteType: payload.remoteType,
      howToApply: payload.howToApply,
      applicationTarget: payload.applicationTarget,
      currency: payload.currency,
      minSalary: payload.minSalary,
      maxSalary: payload.maxSalary,
    });
    return await newJob.save();
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getJobs(query: object, page: number, limit: number) {
  try {
    const jobs = await Job.find(query).lean();
    return jobs;
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create, getJobs };
