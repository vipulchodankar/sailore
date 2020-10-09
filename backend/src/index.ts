import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/server";
import { logger } from "./middleware";
import cors from "cors";
import apiRouter from "./routes";

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());
app.use(logger);

app.use("/api", apiRouter);

app.get("*", (req: Request, res: Response) => {
  res.send("");
});

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}/`);
});
