"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
//routers
// import authRouter from "./auth.routes";
const authRouter = require("./auth.routes");
const job_routes_1 = __importDefault(require("./job.routes"));
const api = express_1.default.Router();
api.use("/auth", authRouter);
api.use("/jobs", job_routes_1.default);
api.get("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});
module.exports = api;
