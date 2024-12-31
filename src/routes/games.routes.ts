import { Router } from "express";
import token from "../middleware/token.middleware";

const router = Router();

const gameRoutes = {
  minecraft: "./games/minecraft.routes"
};

Object.entries(gameRoutes).forEach(([game, routePath]) => {
  router.use(`/${game}`, token, require(routePath).default);
});

export default router;
