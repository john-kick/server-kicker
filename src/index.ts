import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import path from "node:path";
import errorHandler from "./middleware/error.middleware";
import loggerMiddleware from "./middleware/logger.middleware";
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";
import gamesRouter from "./routes/games.routes";
import runnerRouter from "./routes/runner.routes";
import testRouter from "./routes/test.routes";
import MinecraftRunner from "./runner/MinecraftRunner";
import Runner from "./runner/Runner";
import config from "./util/config";

const app = express();

declare module "express-session" {
  interface SessionData {
    [key: string]: string;
  }
}

app.use(errorHandler);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: config.SESSION_KEY, // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `true` if using HTTPS
  })
);

app.use(express.static(path.join(__dirname, "../public")));

app.use(loggerMiddleware);

app.get("/alive", (_req, res) => {
  res.sendStatus(200);
});

app.use("/", dashboardRouter);
app.use("/auth", authRouter);
app.use("/runner", runnerRouter);
app.use("/test", testRouter);
app.use("/games", gamesRouter);

// Register all runners
Runner.registerRunner("minecraft", new MinecraftRunner());

app.listen(config.APP_PORT, () => {
  console.log(`Server listening at http://localhost:${config.APP_PORT}`);
});
