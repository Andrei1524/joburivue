import { Request, Response } from "express";

const express = require("express");

//routers
const authRouter = require("./auth.routes");

const api = express.Router();

api.use("/auth", authRouter);

api.get("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "not found" });
});

export { api };
