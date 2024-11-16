import express, { Request, Response } from "express";
import authRouter from "./routes/auth.routes";

const app = express();

app.use("/auth", authRouter);

app.listen(3000, () => {
  "Server listening at 3000";
});
