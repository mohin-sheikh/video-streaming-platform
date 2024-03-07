import mongoose from "mongoose";
import argon2 from "argon2";

import customId from "../utils/customId";

export interface IUserDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    userId: {
      type: String,
      required: true,
      unique: true,
      default: () => `user_${customId()}`,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as IUserDocument;

  // if the password key is not modified for a user
  // dont do anything
  if (!user.isModified("password")) {
    return next();
  }

  user.password = await argon2.hash(user.password);
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as IUserDocument;
  return await argon2.verify(user.password, candidatePassword);
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
