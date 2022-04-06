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
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
});
mongoose.connection.on("error", () => {
    throw new Error(`unable to connect to database: `);
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connection.close();
    }
    catch (err) {
        console.log(err);
    }
}));
describe("User Password Authentication", () => {
    // test cases
    const payload = {
        name: "andrei",
        email: "adyta094@gmail.com",
        password: "1234567L",
        confirmPassword: "1234567L",
    };
    describe("It should register succesfully", () => {
        app.post("/auth/register");
        request(app)
            .send(Object.assign({}, payload))
            .post("/auth/register")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
            if (err)
                console.log(err);
        });
    });
});
