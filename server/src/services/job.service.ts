import Job from "../model/job.model";
import { limit } from "../config";
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

async function getJobs(query: any, page: number, limit: number) {
  try {
    const skip = (page - 1) * limit;

    let jobs = [];
    let total_items = 0;

    // TODO: simplify this since i fixed the pagination bug
    if (query) {
      const searchJobs = await Job.aggregate([
        {
          $search: {
            index: "search jobs",
            text: {
              query: `{"title": {$eq: ${query}}}`,
              path: {
                wildcard: "*",
              },
            },
          },
        },
        { $sort: { title: -1 } },
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

export { create, getJobs };
