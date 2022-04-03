"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express = require("express");
//routers
const authRouter = require("./auth.routes");
const api = express.Router();
exports.api = api;
api.use("/auth", authRouter);
api.get("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});
