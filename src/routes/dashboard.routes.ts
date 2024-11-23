import { Router } from "express";
import DashboardController from "../controller/DashboardController";
import token from "../middleware/token.middleware";

const router = Router();
const dashboardController = new DashboardController();

router.get("/", token, (req, res) => res.redirect("/dashboard"));
router.get("/dashboard", token, (req, res) =>
  dashboardController.get(req, res)
);

export default router;
