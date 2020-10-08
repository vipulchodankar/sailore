import express, { Request, Response } from "express";
import * as db from "../config/db";
import sailorSchema from "../models/sailor";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("pong!");
});

router.patch("/createSailorTable", async (req: Request, res: Response) => {
  try {
    const data = await db.createSailorTable();
    res.json({ data, message: "Table successfully created" });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_TABLE_EXISTS_ERROR")
      return res.status(409).json({ message: "Table already exists" });
    return res.json(error);
  }
});

router.post("/sailor", async (req: Request, res: Response) => {
  try {
    const { name, rating, age } = req.body;
    const sailor = { name, rating, age };

    await sailorSchema.validate(sailor);

    const data = await db.createSailor(name, rating, age);
    res.json({ data, message: "Sailor Successfully created" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.get("/sailor", async (req: Request, res: Response) => {
  try {
    const data = await db.readAllSailors();
    res.json({ data, message: "Sailors Successfully fetched" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.get("/sailor/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data: any = await db.readSailor(id);

    if (data.length === 0) res.status(404).json({ message: "No Sailor Found" });

    res.json({ data: data[0], message: "Sailor Successfully Fetched" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.put("/sailor/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, rating, age } = req.body;
    const sailor = { name, rating, age };

    await sailorSchema.validate(sailor);

    const data: any = await db.updateSailor(id, name, rating, age);

    res.json({ data, message: "Sailor Successfully Updated" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.delete("/sailor/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: any = await db.deleteSailor(id);

    res.json({ data, message: "Sailor Successfully Deleted" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

export default router;
