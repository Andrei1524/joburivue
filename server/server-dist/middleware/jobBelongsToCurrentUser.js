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
const job_model_1 = __importDefault(require("../model/job.model"));
const authenticateJWT_1 = require("./authenticateJWT");
const jobBelongsToCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { createdBy } = req.body;
    const { jobId, option } = req.params;
    if (option === "edit") {
        yield (0, authenticateJWT_1.authenticateJWT)(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            const foundJob = yield job_model_1.default.findOne({ jobId }).lean();
            if (foundJob &&
                foundJob.createdBy.toString() === req.user._id.toString()) {
                next();
            }
            else {
                return res.sendStatus(401);
            }
        }));
    }
    else if (createdBy) {
        if (createdBy === req.user._id.toString()) {
            next();
        }
        else {
            return res.sendStatus(401);
        }
    }
    else {
        next();
    }
});
module.exports = jobBelongsToCurrentUser;
