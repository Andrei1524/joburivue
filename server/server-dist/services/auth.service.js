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
exports.getCurrentUser = exports.register = exports.login = void 0;
const bcrypt = require("bcrypt");
const _jwt_service_1 = require("./_jwt.service");
const user_model_1 = __importDefault(require("../model/user.model"));
function updateUserRefreshToken(email, newRefreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const foundUser = yield user_model_1.default.findOne({ email }).exec();
        if (foundUser) {
            foundUser.refreshToken = newRefreshToken;
            foundUser.save();
        }
    });
}
function login(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = payload;
            const refresh_token = (0, _jwt_service_1.createRefreshToken)({ email });
            const access_token = (0, _jwt_service_1.createAccessToken)({ email });
            yield updateUserRefreshToken(email, refresh_token);
            return {
                refresh_token,
                access_token,
            };
        }
        catch (error) {
            throw error.message;
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
            // TODO: auto login after sign up & email verification
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
            throw error.message;
        }
    });
}
exports.register = register;
function getCurrentUser(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.default.findOne({ email: payload }).lean().exec();
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.getCurrentUser = getCurrentUser;
