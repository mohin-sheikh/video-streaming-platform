import mongoose from "mongoose";
mongoose.set('strictQuery', false);
import logger from "./logger";
import config from "../config";

function dbConnect() {
  const dbUri = config.dbUri;
  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info(`Database is connected successfully`);
    })
    .catch((err) => {
      logger.error(`Something went wrong while connecting to database`);
      logger.error(err);
      process.exit(1);
    });
}

export default dbConnect;
