import { NextFunction, Request, Response } from "express";

export default async function token(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/auth/login?no_token=1");
  }

  fetch(`http://localhost:3002/auth/validate?token=${token}`).then(
    (response) => {
      if (response.ok) {
        next();
      } else {
        res.status(401).redirect("/auth/login");
      }
    }
  );
}
