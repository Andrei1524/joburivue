import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.services";

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

export { login };
