import { Request, Response } from "express";
import SessionManager from "../util/SessionManager";
import { AlertType } from "../component/Alert";

export default abstract class BaseController {
  protected sessionManager = SessionManager.getInstance();

  protected sendResponse(
    res: Response,
    code: number,
    message: string,
    data?: any
  ): void {
    res.status(code).json({ message, data });
  }

  protected addFlashMessage(req: Request, type: AlertType, message: string) {
    this.sessionManager.addFlashMessage(req, type, message);
  }

  public get(_req: Request, res: Response) {
    this.sendResponse(res, 405, "Method Not Allowed");
  }

  public post(_req: Request, res: Response) {
    this.sendResponse(res, 405, "Method Not Allowed");
  }

  public put(_req: Request, res: Response) {
    this.sendResponse(res, 405, "Method Not Allowed");
  }

  public patch(_req: Request, res: Response) {
    this.sendResponse(res, 405, "Method Not Allowed");
  }

  public delete(_req: Request, res: Response) {
    this.sendResponse(res, 405, "Method Not Allowed");
  }
}
