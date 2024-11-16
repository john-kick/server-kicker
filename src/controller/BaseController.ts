import { Request, Response } from "express";

export default abstract class BaseController {
  public get(req: Request, res: Response) {
    res.sendStatus(405);
  }

  public post(req: Request, res: Response) {
    res.sendStatus(405);
  }

  public put(req: Request, res: Response) {
    res.sendStatus(405);
  }

  public patch(req: Request, res: Response) {
    res.sendStatus(405);
  }

  public delete(req: Request, res: Response) {
    res.sendStatus(405);
  }

  public wrapHTML(html: string): string {
    return `<!DOCTYPE html><head></head><body>${html}</body>`;
  }
}
