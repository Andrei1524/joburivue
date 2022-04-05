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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidate = exports.register = exports.login = void 0;
const AuthService = __importStar(require("../services/auth.service"));
const { check, validationResult } = require("express-validator");
const user_model_1 = __importDefault(require("../model/user.model"));
const registerValidate = [
    check("email", "Must be a valid email address")
        .isEmail()
        .trim()
        .escape()
        .normalizeEmail(),
    check("password")
        .isLength({ min: 8 })
        .withMessage("Password Must Be at Least 8 Characters")
        .matches("[0-9]")
        .withMessage("Password Must Contain a Number")
        .matches("[A-Z]")
        .withMessage("Password Must Contain an Uppercase Letter")
        .trim()
        .escape()
        .exists(),
    check("confirmPassword", "Parolele trebuie sa fie la fel")
        .exists()
        .custom((value, { req }) => value === req.body.password),
];
exports.registerValidate = registerValidate;
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // try {
        //   // TODO: do login
        //   const user = await AuthService.login();
        //   return res
        //     .status(200)
        //     .json({ status: 200, data: user, message: "Succesfully logged in" });
        // } catch (error) {
        //   if (error instanceof Error) {
        //     return res.status(400).json({ status: 400, message: error.message });
        //   } else {
        //     return res.status(400).json({ status: 400, message: "Unexpected error" });
        //   }
        // }
    });
}
exports.login = login;
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            // find if email is already in use
            const foundUserByEmail = yield user_model_1.default.findOne({ email: payload.email })
                .lean()
                .exec();
            if (foundUserByEmail) {
                throw Error("A user with these credentials already exists");
            }
            yield AuthService.register(payload);
            return res.status(200).json({ status: 200, message: "registered user" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ status: 400, message: error.message });
            }
            else {
                return res.status(400).json({ status: 400, message: "Unexpected error" });
            }
        }
    });
}
exports.register = register;
