"use strict";
const mongoose_1 = require("mongoose");
const PlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    expireDate: { type: String, required: true },
    isPlanActive: { type: Boolean, required: true },
    promotedOnSocialChannels: { type: Boolean, required: false },
    listedOnWeeklyNewsletter: { type: Boolean, required: false },
    jobPinnedInSearches: { type: Boolean, required: false },
    jobShowedInRecommendedCompanies: { type: Boolean, required: false },
    boughtBy: { type: mongoose_1.Schema.Types.ObjectId, required: false }, // TODO: make required true
});
const Plan = (0, mongoose_1.model)("Plan", PlanSchema);
module.exports = Plan;
