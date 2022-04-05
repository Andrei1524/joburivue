import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";
const { check, validationResult } = require("express-validator");
import { User } from "../model/user.model";

const registerValidate = [
  check("email", "Must be a valid email address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Be at Least 8 Characters")
    .matches("[0-9]")
    .withMessage("Password Must Contain a Number")
    .matches("[A-Z]")
    .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape()
    .exists(),
  check("confirmPassword", "Parolele trebuie sa fie la fel")
    .exists()
    .custom((value: string, { req }: any) => value === req.body.password),
];

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await AuthService.login();
    return res
      .status(200)
      .json({ status: 200, data: user, message: "Succesfully logged in" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: "Unexpected error" });
    }
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // find if email is already in use
    const foundUserByEmail = await User.findOne({ email: email }).lean().exec();

    if (foundUserByEmail) {
      throw Error("A user with these credentials already exists");
    }

    await AuthService.register();
    return res.status(200).json({ status: 200, message: "registered user" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: "Unexpected error" });
    }
  }
}

export { login, register, registerValidate };
