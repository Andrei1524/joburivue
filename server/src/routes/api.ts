import { Request, Response } from "express";

import express from "express";

import authRouter from "./auth.routes";
import jobRouter from "./job.routes";
import tagRouter from "./tag.routes";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/jobs", jobRouter);
api.use("/tags", tagRouter);

api.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "not found" });
});

export = api;
