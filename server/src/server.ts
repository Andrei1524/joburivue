import http from "http";
require("dotenv").config();

import appServer from "./app";
import { mongoConnect } from "./services/mongo.service";

const httpServer = http.createServer(appServer);

const PORT = process.env.PORT || 4000;

async function startServer() {
  await mongoConnect();

  httpServer.listen(PORT, () => {
    console.log("server listening on port, ", PORT);
  });
}

startServer();
