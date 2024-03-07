import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { CustomError } from "../utils/customError";

// currying!!
// validate is a function that returns another middleware function
const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return next(new CustomError("Bad request payload", 400, e.errors));
    }
  };

export default validate;
