import Job from '../models/jobModel.js';
import {StatusCodes} from 'http-status-codes'
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
    const {search, jobStatus, jobType, sort} = req.query;

    const queryObject = {
      createdBy: req.user.userId, // limit to specific user
    };

    if(search) {
      queryObject.$or = [
        {position: {$regex: search, $options: 'i'}},
        {company: {$regex: search, $options: 'i'}},
      ]
    }
    
    if(jobStatus && jobStatus !== 'all') {
      queryObject.jobStatus = jobStatus
    }

    if(jobType && jobType !== 'all') {
      queryObject.jobType = jobType
    }

    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'position',
      'z-a': '-position'
    }

    const sortKey = sortOptions[sort] || sortOptions.newest;

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit); 
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit)

    res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage: page, jobs, count: jobs.length });
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

export const showStats = async (req, res) => {
  /* built in mongoose method that allows us to display 
    results by matching id and then group by job status */

  let stats = await Job.aggregate([
    {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
    {$group: {_id: '$jobStatus', count: {$sum: 1}}}
  ]);

  /* accumulate and current, we will iterate over the array, pull out the id 
  (with alias title)and count. Then we will set each title to count. This will look like
  pending: 22, interview: 11, declined: 4, then we will return the object */
  stats = stats.reduce((acc, curr) => {
    const {_id: title, count} = curr; // grab id and count
    acc[title] = count; // set title to count in the object
    return acc;// return the object
  }, {}) 

    const defaultStats = { 
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  /* Now we will essentially do the same thing with our monthly applications, but 
  special care will need to be taken to group by the date. We will also then sort in ascending order 
   to get the most recent results first by setting them to -1. Finally, we will limit the results to 6 months*/
  let monthlyApplications = await Job.aggregate([
    {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)} },
    {$group: {
      _id: {
        year: {$year: '$createdAt'}, 
        month: {$month: '$createdAt'}
      },
      count: {$sum: 1},
    }},
    {$sort: {'_id.year': -1, '_id.month': -1}},
    {$limit: 6},
  ]);

  monthlyApplications = monthlyApplications.map((item) => {
    const {_id: {year, month}, count} = item;
    const date = day().month(month - 1).year(year).format('MMM YY');
    return {date, count};
  }).reverse(); 

  res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
}
