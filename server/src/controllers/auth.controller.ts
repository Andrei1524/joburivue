import { NextFunction, Request, Response } from 'express';
const bcrypt = require('bcrypt');
import * as AuthService from '../services/auth.service';
const { check, validationResult } = require('express-validator');
import User from '../model/user.model';

const registerValidate = [
  check('email', 'Must be a valid email address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters')
    // .matches("[0-9]")
    // .withMessage("Password Must Contain a Number")
    // .matches("[A-Z]")
    // .withMessage("Password Must Contain an Uppercase Letter")
    .trim()
    .escape()
    .exists(),
  check('confirmPassword', 'Parolele trebuie sa fie la fel')
    .exists()
    .custom((value: string, { req }: any) => value === req.body.password),
];

const loginValidate = [
  check('email', 'Must be a valid email address')
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('"Must be a valid password"')
    .trim()
    .escape()
    .exists(),
];

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      throw Error('Combinația de e-mail și parolă este invalidă');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const tokens = await AuthService.login(req.body);
      return res.status(200).json(tokens);
    } else {
      throw Error('Combinația de e-mail și parolă este invalidă');
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: error });
    }
  }
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // find if email is already in use
    const foundUserByEmail = await User.findOne({ email: payload.email })
      .lean()
      .exec();

    if (foundUserByEmail) {
      throw Error('Un user cu aceste credențiale deja există!');
    }

    await AuthService.register(payload);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: 'Unexpected error' });
    }
  }
}

async function getCurrentUser(req: Request, res: Response) {
  try {
    const currentUser = await AuthService.getCurrentUser(req.user.email);
    if (currentUser) {
      return res.status(200).json({ user: currentUser });
    } else {
      return null;
    }
  } catch (err) {
    throw Error(`Could not get logged user: ${err}`);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const refresh_token = req.body.refresh_token;

    await AuthService.logout(refresh_token);
    return res.sendStatus(200);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      return res.status(400).json({ status: 400, message: 'Unexpected error' });
    }
  }
}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refresh_token = req.body.refresh_token;

    const access_token = await AuthService.refreshToken(refresh_token);
    return res.status(200).json({ access_token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ status: 400, message: error.message });
    } else {
      console.log(error);
      return res.status(400).json({ status: 400, message: 'Unexpected error' });
    }
  }
}

export {
  login,
  register,
  getCurrentUser,
  logout,
  refreshToken,
  registerValidate,
  loginValidate,
};
