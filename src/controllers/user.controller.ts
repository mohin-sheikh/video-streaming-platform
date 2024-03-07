import { NextFunction, Request, Response } from "express";
import { TCreateUserSchema } from "../schemas/user.schema";
import { createUserService } from "../services/user.service";
import { CustomError } from "../utils/customError";
import logger from "../utils/logger";

export async function createUserHandler(
  req: Request<{}, {}, TCreateUserSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await createUserService(req.body);
    const userResponse = {
      name: user.name,
      email: user.email,
      userId: user.userId,
    };
    return res.send({
      user: userResponse,
    });
  } catch (e: any) {
    logger.error(e);
    // duplicate emails?
    let message = e.message;
    if (e.code === 11000 && e.keyValue && e.keyValue.email) {
      // mongo throws this error for duplicate keys
      message = `Email ${e.keyValue.email} is already in use`;
    }
    return next(new CustomError(message, 409));
  }
}
