import Job from '../model/job.model';
import { JobInterface } from '../ts/interfaces/job.interfaces';
import { nanoid } from 'nanoid';
import { Request } from 'express';

async function create(payload: JobInterface) {
  try {
    const newJob = {
      jobId: nanoid(8),
      title: payload.title,
      company: payload.company._id,
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
      return await Job.findOneAndUpdate(
        { jobId: payload.jobId },
        { ...payload },
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
  queries: any,
  req: Request
) {
  try {
    const { userJobs, createdBy } = queries;
    const skip = (page - 1) * limit;

    let jobs: any = [];

    if (searchString) {
      const searchedJobs = await Job.find({
        title: { $regex: searchString },
      })
        .populate('company')
        .sort({ createdAt: -1 })
        .lean()
        .exec();

      jobs = searchedJobs;
    } else if (createdBy) {
      jobs = await Job.find({ createdBy })
        .populate('company')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    } else {
      jobs = await Job.find({})
        .populate('company')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    }

    if (!userJobs) {
      // homepage jobs - filter jobs to return only non expired plans
      jobs = jobs.filter((job: any) => {
        // TODO: use a better date library to handle dates, I dont trust this because I save expireDate as UTC string
        return new Date(job.plan?.expireDate) >= new Date();
      });
    }

    return { jobs, total_items: jobs.length };
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getJob(jobId: any) {
  try {
    const foundJob = Job.findOne({ jobId })
      .populate('tags')
      .populate('company');
    return foundJob;
  } catch (error) {
    throw (error as Error).message;
  }
}

export { create, getJobs, getJob };
