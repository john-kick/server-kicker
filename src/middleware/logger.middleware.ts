import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `Incoming Request from "${req.hostname}": ${req.method} ${req.url}`
  );

  res.on("finish", () => {
    logger.info(
      `Response: ${req.method} ${req.url} - Status: ${res.statusCode}`
    );
  });

  next();
};

export default loggerMiddleware;
