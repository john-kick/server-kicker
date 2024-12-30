import { Router } from "express";
import MinecraftController from "../../controller/games/MinecraftController";

const router = Router();

const minecraftController = new MinecraftController();

router.get("/", (req, res) => minecraftController.get(req, res));

export default router;
