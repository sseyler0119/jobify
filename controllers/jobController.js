import Job from '../models/jobModel.js';
import {StatusCodes} from 'http-status-codes'

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}); // limit to specific user
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // attach user to job
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};
