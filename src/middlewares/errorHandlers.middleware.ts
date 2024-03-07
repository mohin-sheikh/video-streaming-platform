import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";

// err is not in this as its a valid middleware function
// to trigger the next middleware
export const notFoundMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new CustomError("Not found", 404));
};

export const errorHandlerMiddleware = function (
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    // if it reached here, then we did not specify the error message in
    // the application logic
    customError = new CustomError("An unknown error happened"); // default message
  }

  res.status((customError as CustomError).status).send(customError);
};
