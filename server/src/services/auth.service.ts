const bcrypt = require("bcrypt");

import User from "../model/user.model";
import { UserInterface } from "../ts/interfaces/user.interfaces";

async function login() {
  try {
    // const users = await User.find(query);
    // return users;
    return { user: { name: "blaba" } };
  } catch (e) {
    // Log Errors
    throw Error("Error while logging in");
  }
}

async function register(payload: UserInterface) {
  try {
    const saltRounds = 11;
    const password = payload.password;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // const refresh_token = jwt.sign({username: user.username}, process.env.JWT_REFRESH_TOKEN_SECRET)
    const refresh_token = null;

    const newUser = await new User({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      refreshToken: refresh_token,
    });

    await newUser.save();
  } catch (error: any) {
    // Log Errors
    throw Error(error);
  }
}

export { login, register };
