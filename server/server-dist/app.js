"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// const api = require("./routes/api");
const api_1 = __importDefault(require("./routes/api"));
app.use((0, cors_1.default)());
if (process.env.NODE_ENV === "production") {
    app.use((0, morgan_1.default)("combined"));
}
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
// server public nuxt code
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "dist")));
app.use("/api/v1", api_1.default);
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "dist", "index.html"));
});
module.exports = app;
