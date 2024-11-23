import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();
const authController = new AuthController();

router.get("/login", (req, res) => authController.get(req, res));
router.get("/logout", (req, res) => authController.logout(req, res));

export default router;
