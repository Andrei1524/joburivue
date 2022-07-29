import Job from '../model/job.model';
import { JobInterface } from '../ts/interfaces/job.interfaces';
import { nanoid } from 'nanoid';

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
      return await Job.findOneAndUpdate(
        { jobId: payload.jobId },
        { ...newJob },
        {
          new: true,
        }
      );
    } else {
      return new Job({ ...newJob }).save();
    }
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getJobs(
  searchString: any,
  page: number,
  limit: number,
  queries: any
) {
  try {
    const skip = (page - 1) * limit;

    let jobs: any = [];
    let total_items = 0;
    const findQuery = {
      'plan.isPlanActive': queries.userJobs ? queries.isPlanActive : true,
    };

    if (searchString) {
      const searchJobs = await Job.find({
        $text: { $search: searchString },
        ...findQuery,
      })
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      jobs = searchJobs;
    } else {
      jobs = await Job.find(findQuery)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }

    total_items = jobs.length;

    return { jobs, total_items: total_items };
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getJob(jobId: any) {
  try {
    const foundJob = Job.findOne({ jobId }).populate('tags');
    return foundJob;
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create, getJobs, getJob };
