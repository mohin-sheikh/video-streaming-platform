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
import { Router } from "express";
import {
  createItemHandler,
  deleteItemHandler,
  getItemHandler,
  updateItemHandler,
} from "../controllers/item.controller";
import requireUserMiddleware from "../middlewares/requireUser.middleware";
import validate from "../middlewares/validate.middleware";
import {
  createItemSchema,
  deleteItemSchema,
  getItemSchema,
  updateItemSchema,
} from "../schemas/item.schema";

const router = Router();

router.post(
  "/",
  [requireUserMiddleware, validate(createItemSchema)],
  createItemHandler
);

router.get(
  "/:itemId",
  [requireUserMiddleware, validate(getItemSchema)],
  getItemHandler
);

router.put(
  "/:itemId",
  [requireUserMiddleware, validate(updateItemSchema)],
  updateItemHandler
);

router.delete(
  "/:itemId",
  [requireUserMiddleware, validate(deleteItemSchema)],
  deleteItemHandler
);

export default router;
