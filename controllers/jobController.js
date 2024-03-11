import Job from '../models/jobModel.js';
import {StatusCodes} from 'http-status-codes'
import {NotFoundError} from '../errors/customErrors.js'

export const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById({_id: id});
  if (!job) throw new NotFoundError(`No job with id: ${id}`)
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {company, position} = req.body;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {new: true})
  if (!updatedJob) if (!job) throw new NotFoundError(`No job with id: ${id}`);
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findOneAndDelete({_id: id})
  if (!removedJob) if (!job) throw new NotFoundError(`No job with id: ${id}`);
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};
