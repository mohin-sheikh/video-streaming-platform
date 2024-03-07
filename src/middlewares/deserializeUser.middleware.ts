import { Request, Response, NextFunction } from "express";
import { reissueAccessToken } from "../services/session.service";
import { findSingleUserSession } from "../services/session.service";
import { CustomError } from "../utils/customError";
import { verifyJWT } from "../utils/jwt";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }
  const refreshToken = req.headers["x-referesh"]?.toString();

  // is accesstoken valid?
  // if yes we get back the user
  const { decoded, expired } = verifyJWT(accessToken);

  if (decoded) {
    // check if session is valid
    const session = await findSingleUserSession({
      _id: decoded.session,
      valid: true,
    });

    if (!session) {
      return next(
        new CustomError("Session was removed. Please login again", 403)
      );
    }
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reissueAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
      const { decoded } = verifyJWT(newAccessToken);
      res.locals.user = decoded;
    }
  }

  return next();
};

export default deserializeUser;
