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
exports.handlePaymentCompleted = void 0;
const job_model_1 = __importDefault(require("../model/job.model"));
const seedPlans_1 = require("../seeds/seedPlans");
function handlePaymentCompleted(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userId, selectedPlan] = payload.client_reference_id.split("-");
            // fullfill job create
            yield handleActionsOnSelectedPlan(selectedPlan, userId);
            return true;
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.handlePaymentCompleted = handlePaymentCompleted;
function handleActionsOnSelectedPlan(selectedPlan, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundJob = yield job_model_1.default.findOne({
            createdBy: userId,
        });
        switch (selectedPlan) {
            case "NORMAL":
                seedPlans_1.normalPlan.save(function (err, savedDoc) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                        foundJob.plan = savedDoc._id;
                        yield foundJob.save();
                    });
                });
                break;
            case "BOOSTED":
                seedPlans_1.boostedPlan.save(function (err, savedDoc) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                        foundJob.plan = savedDoc._id;
                        yield foundJob.save();
                    });
                });
                break;
            case "PRO":
                seedPlans_1.proPlan.save(function (err, savedDoc) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                        foundJob.plan = savedDoc._id;
                        yield foundJob.save();
                    });
                });
                break;
        }
    });
}
