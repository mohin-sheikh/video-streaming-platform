import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { ISessionDocument } from "../models/session.model";
import { makeJWT, verifyJWT } from "../utils/jwt";
import { findUserService } from "./user.service";
import config from "../config";

export async function createSessionService(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId, // this is the _id for the user
    userAgent,
  });
  return session.toJSON();
}

export async function findSessionsService(
  query: FilterQuery<ISessionDocument>
) {
  return await SessionModel.find(query).lean();
}

export async function findSingleUserSession(
  query: FilterQuery<ISessionDocument>
) {
  return await SessionModel.findOne(query).lean();
}

export async function updateSessionService(
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) {
  return await SessionModel.updateOne(query, update);
}

export async function reissueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJWT(refreshToken);
  if (!decoded) {
    return "";
  }

  if (!decoded["session"]) {
    return "";
  }

  // check if the session is valid before sending
  // back a new access token
  const session = await SessionModel.findOne({
    _id: decoded["session"],
    valid: true,
  });

  if (!session || !session.valid) {
    return "";
  }

  const user = await findUserService({ _id: session.user });

  if (!user) {
    return false;
  }

  // make new access token with user object
  const accessToken = makeJWT(
    {
      userId: user.userId,
      session: session._id,
    },
    {
      expiresIn: config.accessTokenTTL,
    }
  );

  return accessToken;
}
