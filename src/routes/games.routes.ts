import { Router } from "express";
import minecraftRouter from "./games/minecraft.routes";
import token from "../middleware/token.middleware";

const router = Router();

router.use("/minecraft", token, minecraftRouter);

export default router;
