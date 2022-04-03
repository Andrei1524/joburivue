"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const app = express();
exports.app = app;
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./routes/api");
app.use(cors());
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
}
app.use(express.json()); // if we use json data
// server public nuxt code
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use("/v1", api);
app.get("/*", (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
});
