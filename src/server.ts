import express from "express";
import config from "./config";
import routes from "./routes";
import loggerMiddleware from "./middlewares/logger.middleware";
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from "./middlewares/errorHandlers.middleware";

import deserializeUser from "./middlewares/deserializeUser.middleware";

// we will be using createServer to get back
// an express app which can be used for testing later, if needed!
function createServer() {
  const app = express();

  app.use(express.json());
  app.use(deserializeUser);
  app.use(loggerMiddleware);
  app.use(`/api/${config.apiVersion}`, routes);
  // no routes match the requested route
  app.use(notFoundMiddleware);

  app.use(errorHandlerMiddleware);
  return app;
}

export default createServer;