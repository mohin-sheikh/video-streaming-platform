import { Request, Response, NextFunction } from "express";
import { isValidUserCredentialsService } from "../services/user.service";
import { CustomError } from "../utils/customError";
import {
  createSessionService,
  findSessionsService,
  updateSessionService,
} from "../services/session.service";
import { makeJWT } from "../utils/jwt";
import config from "../config";

export async function createUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // validate user password and email
    const user = await isValidUserCredentialsService(req.body);
    if (!user) {
      return next(new CustomError("Email or password is invalid", 403));
    }

    // now we start creating the session
    const session: any = await createSessionService(
      user._id,
      req.get("user-agent") || ""
    );

    // make access and refresh token
    const accessToken = makeJWT(
      {
        userId: user.userId,
        session: session._id, // we are ok with the public knowing this id
      },
      {
        expiresIn: config.accessTokenTTL,
      }
    );
    const refreshToken = makeJWT(
      {
        userId: user.userId,
        session: session._id,
      },
      {
        expiresIn: config.refreshTokenTTL,
      }
    );

    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (e: any) {
    return next(new CustomError(e.message));
  }
}

export async function getUserSessionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user._id;
    const sessions = await findSessionsService({ user: user, valid: true });
    return res.send({
      sessions,
    });
  } catch (e: any) {
    return next(new CustomError(e.message));
  }
}

export async function deleteUserSessionHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = res.locals.user.session;
    await updateSessionService({ _id: session }, { valid: false });
    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (e: any) {
    return next(new CustomError(e.message));
  }
}
