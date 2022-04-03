import express, { Request, Response } from "express";
const app = express();
import path from "path";

import cors from "cors";
import morgan from "morgan";

const api = require("./routes/api");

app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

app.use(express.json()); // if we use json data
// server public nuxt code
app.use(express.static(path.join(__dirname, "..", "dist")));

app.use("/v1", api);
app.get("/*", (req: Request, res: Response) => {
  // res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
});

export { app };
