import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus: {
        type: String,
        enum: ['interview','declined', 'pending'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time','part-time', 'remote'],
        default: 'full-time',
    },
    jobLocation: {
        type: String,
        default: 'Beaverton',
    }
},{timestamps: true});

export default mongoose.model('Job', JobSchema);