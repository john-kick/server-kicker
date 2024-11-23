import express from "express";
import path from "node:path";
import authRouter from "./routes/auth.routes";
import dashboardRouter from "./routes/dashboard.routes";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", dashboardRouter);
app.use("/auth", authRouter);

app.listen(3000, () => {
  "Server listening at 3000";
});
