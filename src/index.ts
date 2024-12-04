import cookieParser from "cookie-parser";
import express from "express";
import path from "node:path";
import config from "./util/config";
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";
import loggerMiddleware from "./middleware/logger.middleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use(loggerMiddleware);

app.get("/alive", (_req, res) => {
  res.sendStatus(200);
});

app.use("/", dashboardRouter);
app.use("/auth", authRouter);

app.listen(config.APP_PORT, () => {
  console.log(`Server listening at http://localhost:${config.APP_PORT}`);
});
