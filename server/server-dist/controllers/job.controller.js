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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const { check, validationResult } = require("express-validator");
const jobValidate = [];
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json("job created");
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
