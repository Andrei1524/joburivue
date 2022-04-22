import Job from "../model/job.model";
import { JobInterface } from "../ts/interfaces/job.interfaces";
import { nanoid } from "nanoid";

async function create(payload: JobInterface) {
  try {
    const newJob = {
      jobId: nanoid(8),
      title: payload.title,
      company: payload.company,
      type: payload.type,
      level: payload.level,
      description: payload.description,
      tags: payload.tags,
      location: payload.location,
      remoteType: payload.remoteType,
      applicationTarget: payload.applicationTarget,
      currency: payload.currency,
      minSalary: payload.minSalary,
      maxSalary: payload.maxSalary,
      createdBy: payload.createdBy._id,
    };

    if (payload.jobId) {
      newJob.jobId = payload.jobId;
      return Job.findOneAndUpdate({ jobId: payload.jobId }, newJob);
    } else {
      return new Job({ ...newJob }).save();
    }
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getJobs(query: any, page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;

    let jobs = [];
    let total_items = 0;

    if (query) {
      const searchJobs = await Job.aggregate([
        {
          $search: {
            index: "search jobs",
            text: {
              query: `{"title": {$eq: ${query}}}`,
              fuzzy: {},
              path: {
                wildcard: "*",
              },
            },
          },
        },
        {
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
            data: [{ $skip: skip }, { $limit: limit }],
          },
        },
      ]);
      jobs = searchJobs[0].data;
      total_items = searchJobs[0].metadata[0].total;
    } else {
      jobs = await Job.find({}).skip(skip).limit(limit).lean().exec();
      total_items = await Job.countDocuments(query);
    }

    return { jobs, total_items: total_items };
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getJob(jobId: any) {
  try {
    const foundJob = Job.findOne({ jobId }).populate("tags");
    return foundJob;
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create, getJobs, getJob };
