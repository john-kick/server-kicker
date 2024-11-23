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

  public wrapHTML(html: string[], navBar: boolean = true): string {
    return `
		<!DOCTYPE html>
			<head>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
				<title>Server Kicker</title>
			</head>
			<body data-bs-theme="dark">
				${navBar ? new NavBar().render() : ""}
				${html.join("")}
			</body>`;
  }
}
