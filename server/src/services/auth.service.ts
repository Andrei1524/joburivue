const bcrypt = require("bcrypt");
import { createRefreshToken, createAccessToken } from "./_jwt.service";
import User from "../model/user.model";
import {
  LoginInterface,
  RegisterInterface,
} from "../ts/interfaces/user.interfaces";

async function login(payload: LoginInterface) {
  try {
    const { email, password } = payload;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw Error("Combinația de e-mail și parolă este invalidă");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const refresh_token = createRefreshToken(user);
      const access_token = createAccessToken(user);
      user.refreshToken = refresh_token;
      user.save();
      return {
        refresh_token,
        access_token,
      };
    } else {
      throw Error("Combinația de e-mail și parolă este invalidă");
    }
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

export { login, register };
