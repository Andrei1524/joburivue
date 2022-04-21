"use strict";
const mongoose_1 = require("mongoose");
const JobSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
JobSchema.index({ "$**": "text" });
const Job = (0, mongoose_1.model)("Job", JobSchema);
module.exports = Job;
