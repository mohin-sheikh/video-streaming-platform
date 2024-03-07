import jwt from "jsonwebtoken";
import config from "../config";

const privateKey = config.privateKey;
const publicKey = config.publicKey;

export function makeJWT(payload: Object, options?: jwt.SignOptions) {
  return jwt.sign(payload, privateKey, { ...options, algorithm: "RS256" });
}

interface IUserSession {
  userId: string;
  session: string;
}
interface IJWTDecoded {
  valid: boolean;
  expired: boolean;
  decoded: IUserSession | null;
}

export function verifyJWT(token: string): IJWTDecoded {
  // .verify throws an error if the token is invalid
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded as IUserSession,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
