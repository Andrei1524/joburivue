"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSeedingPlans = exports.proPlan = exports.boostedPlan = exports.normalPlan = void 0;
const _mongo_service_1 = require("../services/_mongo.service");
const plan_model_1 = __importDefault(require("../model/plan.model"));
const { DateTime } = require("luxon");
const normalPlanDays = 35;
const normalPlan = new plan_model_1.default({
    name: "NORMAL",
    expireDate: DateTime.now().plus({ minutes: 2 }),
    isPlanActive: true,
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: false,
    jobPinnedInSearches: false,
    jobShowedInRecommendedCompanies: false,
});
exports.normalPlan = normalPlan;
const boostedPlanDays = 60;
const boostedPlan = new plan_model_1.default({
    name: "BOOSTED",
    expireDate: DateTime.now().plus({ days: boostedPlanDays }),
    isPlanActive: true,
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: true,
    jobPinnedInSearches: true,
    jobShowedInRecommendedCompanies: false,
});
exports.boostedPlan = boostedPlan;
const proPlanDays = 60;
const proPlan = new plan_model_1.default({
    name: "PRO",
    expireDate: DateTime.now().plus({ days: proPlanDays }),
    isPlanActive: true,
    promotedOnSocialChannels: true,
    listedOnWeeklyNewsletter: true,
    promotedOnWeeklyNewsletter: true,
    jobPinnedInSearches: true,
    jobShowedInRecommendedCompanies: true,
});
exports.proPlan = proPlan;
const plans = [normalPlan, boostedPlan, proPlan];
function startSeedingPlans() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, _mongo_service_1.mongoConnect)();
            yield plan_model_1.default.deleteMany({});
            plans.map((plan, index) => __awaiter(this, void 0, void 0, function* () {
                yield plan.save((err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (index === plans.length - 1) {
                        console.log("SEEDED PLANS!");
                        yield (0, _mongo_service_1.mongoDisconnect)();
                    }
                }));
            }));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.startSeedingPlans = startSeedingPlans;
