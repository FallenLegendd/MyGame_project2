const path = require("path");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });
const jwtConfig = require("../config/jwtConfig");

const generateJWTTokens = (payload) => ({
  accessToken: jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    jwtConfig.access
  ),
  refreshToken: jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET,
    jwtConfig.refresh
  ),
});

module.exports = generateJWTTokens;
