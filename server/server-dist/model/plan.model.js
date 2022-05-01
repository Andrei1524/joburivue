"use strict";
const mongoose_1 = require("mongoose");
const PlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    activeDuration: { type: String, required: true },
    promotedOnSocialChannels: { type: Boolean, required: false },
    listedOnWeeklyNewsletter: { type: Boolean, required: false },
    jobPinnedInSearches: { type: Boolean, required: false },
    jobShowedInRecommendedCompanies: { type: Boolean, required: false },
});
const Plan = (0, mongoose_1.model)("Plan", PlanSchema);
module.exports = Plan;
