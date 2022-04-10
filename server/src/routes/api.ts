import { Request, Response } from "express";

import express from "express";

//routers
// import authRouter from "./auth.routes";
const authRouter = require("./auth.routes");
import jobRouter from "./job.routes";

const api = express.Router();

api.use("/auth", authRouter);
api.use("/jobs", jobRouter);

api.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "not found" });
});

export = api;
