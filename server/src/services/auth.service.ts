const bcrypt = require("bcrypt");
import { createRefreshToken, createAccessToken } from "./_jwt.service";
import User from "../model/user.model";
import {
  LoginInterface,
  RegisterInterface,
} from "../ts/interfaces/user.interfaces";

async function updateUserRefreshToken(email: string, newRefreshToken: string) {
  const foundUser = await User.findOne({ email }).exec();
  if (foundUser) {
    foundUser.refreshToken = newRefreshToken;
    foundUser.save();
  }
}

async function login(payload: LoginInterface) {
  try {
    const { email } = payload;

    const refresh_token = createRefreshToken({ email });
    const access_token = createAccessToken({ email });

    await updateUserRefreshToken(email, refresh_token);
    return {
      refresh_token,
      access_token,
    };
  } catch (error) {
    throw (error as Error).message;
  }
}

async function register(payload: RegisterInterface) {
  try {
    const saltRounds = 11;
    const password = payload.password;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // TODO: auto login after sign up & email verification
    // const refresh_token = jwt.sign({username: user.username}, process.env.JWT_REFRESH_TOKEN_SECRET)
    const refresh_token = null;

    const newUser = await new User({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      refreshToken: refresh_token,
    });

    await newUser.save();
  } catch (error) {
    throw (error as Error).message;
  }
}

async function getCurrentUser(payload: string) {
  try {
    return await User.findOne({ email: payload })
      .select(["-password"])
      .lean()
      .exec();
  } catch (error) {
    throw (error as Error).message;
  }
}

async function logout(refresh_token: string) {
  try {
    return await User.findOneAndUpdate(
      { refreshToken: refresh_token },
      {
        refreshToken: null,
      }
    ).exec();
  } catch (error) {
    throw (error as Error).message;
  }
}

export { login, register, getCurrentUser, logout };
