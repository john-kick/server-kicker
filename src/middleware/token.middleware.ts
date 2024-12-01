import { NextFunction, Request, Response } from "express";
import config from "../util/config";

export default async function token(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/auth/login?session_expired=1");
  }

  fetch(`${config.AUTH_SERVER_URL}/validate?token=${token}`).then(
    async (response) => {
      if (response.ok) {
        const newToken = (await response.json()).token;
        res.cookie("token", newToken);
        next();
      } else {
        res.status(401).redirect("/auth/login?session_expired=1");
      }
    }
  );
}
