import { LoginInterface } from "../ts/interfaces/user.interfaces";

const jwt = require("jsonwebtoken");

const accessTokenExp = 604800; // 7 days expiration

function createAccessToken(user: LoginInterface) {
  return jwt.sign(
    { username: user.email },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: accessTokenExp }
  );
}

function createRefreshToken(user: LoginInterface) {
  return jwt.sign(
    { username: user.email },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: 60 * 60 * 24 * 30 }
  ); // 30days
}

export { createAccessToken, createRefreshToken };
