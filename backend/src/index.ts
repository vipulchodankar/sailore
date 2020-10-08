import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/server";

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("404! Shoo!");
});

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Test message" });
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong!");
});

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}/`);
});
