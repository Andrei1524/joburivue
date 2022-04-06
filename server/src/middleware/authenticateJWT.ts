const _ = require("lodash");
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import User from "../model/user.model";

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET!,
      async (err: any, user: any) => {
        console.log(user);
        if (err) {
          return res.sendStatus(403);
        }

        // assign current user details to the req
        req.user = await User.findOne({ email: user.email }).lean().exec();
        _.unset(req.user, "password");

        if (req.user) {
          next();
        } else {
          return res.sendStatus(403);
        }
      }
    );
  } else {
    res.sendStatus(401);
  }
};

export { authenticateJWT };
