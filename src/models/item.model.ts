import mongoose from "mongoose";
import customId from "../utils/customId";
import { IUserDocument } from "./user.model";

export interface IItemDocument extends mongoose.Document {
  user: IUserDocument["_id"];
  title: string;
  description: string;
  itemId?: string; // this is added my mongoose
}

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: String,
      required: true,
      unique: true,
      default: () => `item_${customId()}`,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const ItemModel = mongoose.model("Item", itemSchema);

export default ItemModel;
