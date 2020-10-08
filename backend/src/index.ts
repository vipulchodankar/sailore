import express, { Application } from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/server";
import { logger } from "./middleware";
import apiRouter from "./routes";

const app: Application = express();

app.use(bodyParser.json());
app.use(logger);

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}/`);
});
