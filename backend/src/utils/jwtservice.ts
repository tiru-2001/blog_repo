import jwt from "jsonwebtoken";
import config from "../config/config";

const generateTokens = (payload: { userId: string; email: string }) => {
  const accessToken = jwt.sign(
    {
      userId: payload.userId,

      email: payload.email,
    },
    config.jwt_access,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(payload, config.jwt_refresh, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

/*********verify access token***********/
const verifyAccessToken = (token: string) =>
  jwt.verify(token, config.jwt_access);
/*********verify refresh token***********/
const verifyRefreshToken = (token: string) =>
  jwt.verify(token, config.jwt_refresh);
export { generateTokens, verifyAccessToken, verifyRefreshToken };
