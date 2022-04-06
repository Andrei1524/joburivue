"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jwt = require("jsonwebtoken");
const accessTokenExp = 604800; // 7 days expiration
function createAccessToken(user) {
    return jwt.sign({ username: user.email }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExp });
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(user) {
    return jwt.sign({ email: user.email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 24 * 30,
    }); // 30days
}
exports.createRefreshToken = createRefreshToken;
