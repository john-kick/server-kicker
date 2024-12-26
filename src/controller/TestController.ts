import { Request, Response } from "express";
import BaseController from "./BaseController";
import Test from "../pages/Test";
import Input from "../elements/Input";
import Form from "../elements/Form";
import Button from "../elements/Button";

export default class TestController extends BaseController {
  get(req: Request, res: Response): void {
    const checked = this.sessionManager.get<string>(req, "checked");
    const page = new Test({ checked });
    res.send(page.render());
  }
}
