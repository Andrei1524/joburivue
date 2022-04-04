"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const httpServer = http_1.default.createServer(app_1.default);
const PORT = process.env.PORT || 4000;
function startServer() {
    // await mongoConnect()
    httpServer.listen(PORT, () => {
        console.log("server listening on port, ", PORT);
    });
}
startServer();
