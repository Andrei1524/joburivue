const jwt = require("jsonwebtoken");

const accessTokenExp = 604800; // 7 days expiration
const refreshTokenExp = 60 * 60 * 24 * 30; // 30days

interface JwtServiceInterface {
  email: string;
}

function createAccessToken(user: JwtServiceInterface) {
  return jwt.sign({ email: user.email }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExp,
  });
}

function createRefreshToken(user: JwtServiceInterface) {
  return jwt.sign({ email: user.email }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExp,
  });
}

export { createAccessToken, createRefreshToken };
