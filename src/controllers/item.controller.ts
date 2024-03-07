/*
  README!

███████████████████████████
███████▀▀▀░░░░░░░▀▀▀███████
████▀░░░░░░░░░░░░░░░░░▀████
███│░░░░░░░░░░░░░░░░░░░│███
██▌│░░░░░░░░░░░░░░░░░░░│▐██
██░└┐░░░░░░░░░░░░░░░░░┌┘░██
██░░└┐░░░░░░░░░░░░░░░┌┘░░██
██░░┌┘▄▄▄▄▄░░░░░▄▄▄▄▄└┐░░██
██▌░│██████▌░░░▐██████│░▐██
███░│▐███▀▀░░▄░░▀▀███▌│░███
██▀─┘░░░░░░░▐█▌░░░░░░░└─▀██
██▄░░░▄▄▄▓░░▀█▀░░▓▄▄▄░░░▄██
████▄─┘██▌░░░░░░░▐██└─▄████
█████░░▐█─┬┬┬┬┬┬┬─█▌░░█████
████▌░░░▀┬┼┼┼┼┼┼┼┬▀░░░▐████
█████▄░░░└┴┴┴┴┴┴┴┘░░░▄█████
███████▄░░░░░░░░░░░▄███████
██████████▄▄▄▄▄▄▄██████████
███████████████████████████

 this is a hypothetical thing that is
 tied to a user to do CRUD ops with.

 REMOVE the item module entirely when setting
 up your project! This is only here to act as a
 reference for doing CRUD ops on an authenticated
 route
*/
import { NextFunction, Request, Response } from "express";
import {
  TCreateItemSchema,
  TGetItemSchema,
  TUpdateItemSchema,
} from "../schemas/item.schema";
import {
  createItemService,
  deleteItemService,
  findAndUpdateItemService,
  findItemService,
} from "../services/item.service";
import { CustomError } from "../utils/customError";

export async function createItemHandler(
  req: Request<{}, {}, TCreateItemSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user._id;
  const body = req.body;
  const item = await createItemService({ ...body, user: user });

  return res.send({ item });
}

export async function updateItemHandler(
  req: Request<TUpdateItemSchema["params"], {}, TUpdateItemSchema["body"]>,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user._id;
  const update = req.body;
  const itemId = req.params.itemId;
  const item = await findItemService({ itemId });

  if (!item) {
    return next(new CustomError("Item not found", 404));
  }

  if (String(item.user) !== String(user)) {
    return next(new CustomError("You are not the author of this item", 403));
  }

  const updatedItem = await findAndUpdateItemService({ itemId }, update, {
    new: true,
  });

  return res.send({ item: updatedItem });
}

export async function getItemHandler(
  req: Request<TGetItemSchema["params"]>,
  res: Response,
  next: NextFunction
) {
  const itemId = req.params.itemId;
  const item = await findItemService({ itemId });

  if (!item) {
    return next(new CustomError("Item not found", 404));
  }

  return res.send({ item });
}

export async function deleteItemHandler(
  req: Request<TUpdateItemSchema["params"]>,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user._id;
  const itemId = req.params.itemId;
  const item = await findItemService({ itemId });

  if (!item) {
    return next(new CustomError("Item not found", 404));
  }

  if (String(item.user) !== String(user)) {
    return next(new CustomError("You are not the author of this item", 403));
  }

  await deleteItemService({ itemId });

  return res.sendStatus(200);
}
