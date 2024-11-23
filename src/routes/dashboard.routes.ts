import { Router } from "express";
import DashboardController from "../controller/DashboardController";

const router = Router();
const dashboardController = new DashboardController();

router.get("/", (req, res) => dashboardController.get(req, res));

export default router;
