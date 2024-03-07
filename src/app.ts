import "dotenv/config";
import logger from "./utils/logger";
import dbConnect from "./utils/dbConnect";
import config from "./config";
import createServer from "./server";

function areKeysOK(): boolean {
  if (!config.privateKey || !config.publicKey) {
    return false;
  }
  return true;
}

if (!areKeysOK()) {
  logger.error("private and public key pairs are not properly set");
  logger.error("please set these env variables and restart the server");
  process.exit(1);
}

const app = createServer();

app.listen(config.port, async () => {
  logger.info(`Api version ${config.apiVersion}`);
  logger.info(`Server Started - http://localhost:${config.port}`);
  await dbConnect();
});
