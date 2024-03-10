import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { findUserService } from "../services/user.service";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return next(new CustomError("Authorization required", 403));
  }

  // we append the new user details from database, as we dont attach _id in
  // the jwt we sign during login
  const userInfo = await findUserService({ userId: user.userId, isDeleted: false });
  if (!userInfo) {
    return next(new CustomError("Authorization failed", 403));
  }

  res.locals.user = {
    ...user,
    _id: userInfo._id,
  };

  next();
};

export default requireUser;
