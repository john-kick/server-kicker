import { Router, Request, Response } from "express";
import TestController from "../controller/TestController";

const router = Router();

const testController = new TestController();

router.get("/", (req, res) => testController.get(req, res));

export default router;
