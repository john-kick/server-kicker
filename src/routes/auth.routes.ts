import { Router } from "express";
import LoginController from "../controller/LoginController";
import RegisterController from "../controller/RegisterController";

const router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();

router.get("/login", (req, res) => loginController.get(req, res));
router.post("/login", (req, res) => loginController.login(req, res));

router.get("/register", (req, res) => registerController.get(req, res));
router.post("/register", (req, res) => registerController.register(req, res));

router.post("/logout", (req, res) => loginController.logout(req, res));

export default router;
