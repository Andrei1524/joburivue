"use strict";
const mongoose_1 = require("mongoose");
// Schema.Types.ObjectId
//Types.ObjectId
const JobSchema = new mongoose_1.Schema({
    jobId: { type: String, required: true },
    title: {
        type: String,
        required: true,
    },
    company: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company", required: true },
    type: { type: String, required: true },
    level: { type: String, required: false },
    description: { type: String, required: true },
    tags: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Tag", required: false }],
    location: { type: String, required: true },
    remoteType: { type: String, required: false },
    applicationTarget: { type: String, required: true },
    currency: { type: String, required: true },
    minSalary: { type: Number, required: false },
    maxSalary: { type: Number, required: false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: mongoose_1.Schema.Types.ObjectId, ref: "Plan", required: false },
});
JobSchema.index({ "$**": "text" });
const Job = (0, mongoose_1.model)("Job", JobSchema);
module.exports = Job;
