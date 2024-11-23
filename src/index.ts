import express from "express";
import path from "node:path";
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", dashboardRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  console.log("Server listening at 3000");
});
