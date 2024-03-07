import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { IUserDocument } from "../models/user.model";

export async function createUserService(
  input: DocumentDefinition<
    Omit<IUserDocument, "createdAt" | "updatedAt" | "userId">
  >
) {
  return await UserModel.create(input);
}

export async function isValidUserCredentialsService({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email }, "userId password");
  if (!user) {
    return false;
  }
  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) return false;

  return {
    _id: user._id,
    userId: user.userId,
  };
}

export async function findUserService(query: FilterQuery<IUserDocument>) {
  // by using .lean() we get plain js objects and not mongoose documents
  // https://mongoosejs.com/docs/tutorials/lean.html
  return await UserModel.findOne(query, "userId").lean();
}
