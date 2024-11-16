import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();
const authController = new AuthController();

router.get("/login", authController.get);

export default router;
