// import supertest from "supertest";
// import app from "../app";
import { Request, Response } from "express";
import User from "../model/user.model";

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

afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
});

describe("User Password Authentication", () => {
  // test cases
  const payload = {
    name: "andrei",
    email: "adyta094@gmail.com",
    password: "1234567L",
    confirmPassword: "1234567L",
  };

  describe("It should register succesfully", () => {
    app.post("/auth/register", { ...payload });

    request(app)
      .post("/auth/register")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err: Error, res: Response) {
        throw (err as Error).message;
      });
  });
});
