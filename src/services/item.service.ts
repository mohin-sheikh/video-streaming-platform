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

import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ItemModel, { IItemDocument } from "../models/item.model";

export async function createItemService(
  input: DocumentDefinition<Omit<IItemDocument, "createdAt" | "updatedAt">>
) {
  return await ItemModel.create(input);
}

export async function findItemService(
  query: FilterQuery<IItemDocument>,
  options: QueryOptions = { lean: true }
) {
  // the {} here is the projections
  // it can also be a space separate string
  // look in user.service.ts for an example
  return await ItemModel.findOne(query, {}, options);
}

export async function findAndUpdateItemService(
  query: FilterQuery<IItemDocument>,
  update: UpdateQuery<IItemDocument>,
  options: QueryOptions
) {
  return await ItemModel.findOneAndUpdate(query, update, options);
}

export async function deleteItemService(query: FilterQuery<IItemDocument>) {
  return await ItemModel.deleteOne(query);
}
