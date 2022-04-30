"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const job_routes_1 = __importDefault(require("./job.routes"));
const tag_routes_1 = __importDefault(require("./tag.routes"));
const checkout_routes_1 = __importDefault(require("./checkout.routes"));
const api = express_1.default.Router();
api.use("/auth", auth_routes_1.default);
api.use("/jobs", job_routes_1.default);
api.use("/tags", tag_routes_1.default);
api.use("/webhooks", checkout_routes_1.default);
api.get("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});
module.exports = api;
