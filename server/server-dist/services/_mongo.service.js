"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once("open", () => {
    // event listener for connection
    console.log("mongo db connection ready");
});
mongoose.connection.on("error", (error) => {
    // event listener for connection, we put this anywhere we want
    console.error(error);
});
function mongoConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
}
exports.mongoConnect = mongoConnect;
function mongoDisconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose.disconnect();
    });
}
exports.mongoDisconnect = mongoDisconnect;
