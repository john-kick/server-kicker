import { Request, Response } from "express";
import NavBar from "../components/NavBar";

export default abstract class BaseController {
  public get(_req: Request, res: Response) {
    res.sendStatus(405);
  }

  public post(_req: Request, res: Response) {
    res.sendStatus(405);
  }

  public put(_req: Request, res: Response) {
    res.sendStatus(405);
  }

  public patch(_req: Request, res: Response) {
    res.sendStatus(405);
  }

  public delete(_req: Request, res: Response) {
    res.sendStatus(405);
  }
}
