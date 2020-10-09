import express, { Request, Response } from "express";
import pool from "../config/db";
import sailorSchema from "../models/sailor";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("pong!");
});

router.patch("/createSailorTable", async (req: Request, res: Response) => {
  try {
    const data = await pool.query(
      `CREATE TABLE SAILOR (SID INT PRIMARY KEY AUTO_INCREMENT, SNAME VARCHAR(64), RATING INT, AGE INT)`
    );
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
    const { SNAME, RATING, AGE } = req.body;
    const sailor = { SNAME, RATING, AGE };

    await sailorSchema.validate(sailor);

    const data = await pool.query(
      `INSERT INTO SAILOR (SNAME, RATING, AGE) values (?, ?, ?)`,
      [SNAME, RATING, AGE]
    );

    res.json({ data, message: "Sailor Successfully created" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.get("/sailor", async (req: Request, res: Response) => {
  try {
    const data = await pool.query(`SELECT * FROM SAILOR`);
    res.json({ data, message: "Sailors Successfully fetched" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.get("/sailor/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data: any = await pool.query(`SELECT * FROM SAILOR WHERE SID = ?`, [
      id,
    ]);

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
    const { SNAME, RATING, AGE } = req.body;
    const sailor = { SNAME, RATING, AGE };

    await sailorSchema.validate(sailor);

    const data: any = await pool.query(
      `UPDATE SAILOR SET SNAME = ?, RATING = ?, AGE = ? WHERE SID = ?`,
      [SNAME, RATING, AGE, id]
    );

    res.json({ data, message: "Sailor Successfully Updated" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

router.delete("/sailor/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: any = await pool.query(`DELETE FROM SAILOR WHERE SID = ?`, [
      id,
    ]);
    res.json({ data, message: "Sailor Successfully Deleted" });
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
});

export default router;
