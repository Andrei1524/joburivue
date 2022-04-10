"use strict";
const mongoose_1 = require("mongoose");
// Schema.Types.ObjectId
//Types.ObjectId
const JobSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    type: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    location: { type: String, required: true },
    howToApply: { type: String, required: true },
    applicationTarget: { type: String, required: true },
    currency: { type: String, required: true },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
});
const Job = (0, mongoose_1.model)("Job", JobSchema);
module.exports = Job;
