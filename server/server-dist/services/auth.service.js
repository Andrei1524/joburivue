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
exports.register = exports.login = void 0;
const bcrypt = require("bcrypt");
const user_model_1 = __importDefault(require("../model/user.model"));
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const users = await User.find(query);
            // return users;
            return { user: { name: "blaba" } };
        }
        catch (e) {
            // Log Errors
            throw Error("Error while logging in");
        }
    });
}
exports.login = login;
function register(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const saltRounds = 11;
            const password = payload.password;
            const hashedPassword = yield bcrypt.hash(password, saltRounds);
            // const refresh_token = jwt.sign({username: user.username}, process.env.JWT_REFRESH_TOKEN_SECRET)
            const refresh_token = null;
            const newUser = yield new user_model_1.default({
                name: payload.name,
                email: payload.email,
                password: hashedPassword,
                refreshToken: refresh_token,
            });
            yield newUser.save();
        }
        catch (error) {
            // Log Errors
            throw Error(error);
        }
    });
}
exports.register = register;
