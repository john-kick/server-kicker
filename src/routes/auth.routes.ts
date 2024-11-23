import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();
const authController = new AuthController();

router.get("/login", (req, res) => authController.get(req, res));

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

export default router;
