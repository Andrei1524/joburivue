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
exports.startSeedingPlans = void 0;
const _mongo_service_1 = require("../services/_mongo.service");
const plan_model_1 = __importDefault(require("../model/plan.model"));
const plans = [
    new plan_model_1.default({
        name: "NORMAL",
        activeDuration: "35",
        promotedOnSocialChannels: true,
        listedOnWeeklyNewsletter: true,
        promotedOnWeeklyNewsletter: false,
        jobPinnedInSearches: false,
        jobShowedInRecommendedCompanies: false,
    }),
    new plan_model_1.default({
        name: "BOOSTED",
        activeDuration: "60",
        promotedOnSocialChannels: true,
        listedOnWeeklyNewsletter: true,
        promotedOnWeeklyNewsletter: true,
        jobPinnedInSearches: true,
        jobShowedInRecommendedCompanies: false,
    }),
    new plan_model_1.default({
        name: "PRO",
        activeDuration: "60",
        promotedOnSocialChannels: true,
        listedOnWeeklyNewsletter: true,
        promotedOnWeeklyNewsletter: true,
        jobPinnedInSearches: true,
        jobShowedInRecommendedCompanies: true,
    }),
];
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
