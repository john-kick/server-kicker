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
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
			<link rel="stylesheet" href="http://localhost:3000/styles.css">
				<title>Server Kicker</title>
			</head>
			<body data-bs-theme="dark">
				${navBar ? new NavBar().render() : ""}
				${html.join("")}
				<div style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);">
					<p>
						The website is still in development. If you find a bug or have feedback: <strong>I DO NOT CARE!</strong>
					</p>
					<p>
						Also: I use cookies. What are you gonna do about it?
					</p>
				</div>
			</body>`;
  }
}
