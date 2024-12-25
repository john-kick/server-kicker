import cookieParser from "cookie-parser";
import express from "express";
import path from "node:path";
import loggerMiddleware from "./middleware/logger.middleware";
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";
import runnerRouter from "./routes/runner.routes";
import config from "./util/config";
import session from "express-session";

const app = express();

declare module "express-session" {
  interface SessionData {
    [key: string]: string;
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: config.SESSION_KEY, // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Use `true` if using HTTPS
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

app.listen(config.APP_PORT, () => {
  console.log(`Server listening at http://localhost:${config.APP_PORT}`);
});
