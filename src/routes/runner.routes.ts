import { Router } from "express";
import RunnerController from "../controller/RunnerController";

const router = Router();

const runnerController = new RunnerController();

router.post("/start", (req, res) => runnerController.start(req, res));
router.post("/stop", (req, res) => runnerController.stop(req, res));

export default router;
