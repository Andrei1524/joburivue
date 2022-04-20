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
exports.getJobs = exports.create = void 0;
const job_model_1 = __importDefault(require("../model/job.model"));
const nanoid_1 = require("nanoid");
function create(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newJob = yield new job_model_1.default({
                jobId: (0, nanoid_1.nanoid)(8),
                title: payload.title,
                company: payload.company,
                type: payload.type,
                level: payload.level,
                description: payload.description,
                tags: payload.tags,
                location: payload.location,
                remoteType: payload.remoteType,
                applicationTarget: payload.applicationTarget,
                currency: payload.currency,
                minSalary: payload.minSalary,
                maxSalary: payload.maxSalary,
                createdBy: payload.createdBy._id,
            });
            return yield newJob.save();
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.create = create;
function getJobs(query, page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const skip = (page - 1) * limit;
            let jobs = [];
            let total_items = 0;
            if (query) {
                const searchJobs = yield job_model_1.default.aggregate([
                    {
                        $search: {
                            index: "search jobs",
                            text: {
                                query: `{"title": {$eq: ${query}}}`,
                                fuzzy: {},
                                path: {
                                    wildcard: "*",
                                },
                            },
                        },
                    },
                    {
                        $facet: {
                            metadata: [{ $count: "total" }, { $addFields: { page: page } }],
                            data: [{ $skip: skip }, { $limit: limit }],
                        },
                    },
                ]);
                jobs = searchJobs[0].data;
                total_items = searchJobs[0].metadata[0].total;
            }
            else {
                jobs = yield job_model_1.default.find({}).skip(skip).limit(limit).lean().exec();
                total_items = yield job_model_1.default.countDocuments(query);
            }
            return { jobs, total_items: total_items };
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.getJobs = getJobs;
