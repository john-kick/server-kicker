import { Router } from "express";
import MinecraftController from "../../controller/games/MinecraftController";

const router = Router();

const minecraftController = new MinecraftController();

router.get("/", (req, res) => minecraftController.get(req, res));
router.post("/create", (req, res) => minecraftController.create(req, res));
router.post("/updateVersionData", (req, res) =>
  minecraftController.updateMinecraftVersionData(req, res)
);

export default router;
