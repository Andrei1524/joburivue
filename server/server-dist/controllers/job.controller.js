"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobValidate = exports.getJobs = exports.create = void 0;
const JobService = __importStar(require("../services/job.service"));
const { check, validationResult } = require("express-validator");
const createJobValidate = [
    check("title")
        .exists()
        .withMessage("Jobul trebuie sa contina un titlu!")
        .isLength({ min: 8 })
        .withMessage("Titlul trebuie sa fie de cel putin 8 caractere!")
        .trim()
        .escape(),
    check("type")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Specificati tipul jobului!"),
    check("description")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Adaugati o descriere!"),
    check("location")
        .custom((value, { req }) => {
        if (value && value.length > 0) {
            return true;
        }
        else {
            return req.body.remoteType === "remote_only";
        }
    }) // TODO: add remote types to a TS types
        .withMessage("Locatia este necesara daca jobul este optional remote!"),
    check("howToApply")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Adaugati instructiuni de aplicare!"),
    check("applicationTarget")
        .exists()
        .not()
        .isEmpty()
        .withMessage("Adaugati p metoda de aplicare!"),
];
exports.createJobValidate = createJobValidate;
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            yield JobService.create(payload);
            return res.sendStatus(200);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ status: 400, message: error.message });
            }
            else {
                return res.status(400).json({ status: 400, message: error });
            }
        }
    });
}
exports.create = create;
function getJobs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = req.params.page ? req.params.page : 1;
            const limit = 10;
            const jobs = yield JobService.getJobs({}, Number(page), limit);
            return res.status(200).json(jobs);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ status: 400, message: error.message });
            }
            else {
                return res.status(400).json({ status: 400, message: error });
            }
        }
    });
}
exports.getJobs = getJobs;
