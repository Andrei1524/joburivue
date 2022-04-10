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
exports.create = void 0;
const job_model_1 = __importDefault(require("../model/job.model"));
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newJob = yield new job_model_1.default({
                title: payload.title,
                type: payload.type,
                level: payload.level,
                description: payload.description,
                tags: payload.tags,
                location: payload.location,
                remoteType: payload.remoteType,
                howToApply: payload.howToApply,
                applicationTarget: payload.applicationTarget,
                currency: payload.currency,
                minSalary: payload.minSalary,
                maxSalary: payload.maxSalary,
            });
            return yield newJob.save();
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.create = create;
