const AuthService = require("../services/auth.services");

async function login(req, res, next) {
  try {
    const user = await AuthService.login();
    return res
      .status(200)
      .json({ status: 200, data: user, message: "Succesfully logged in" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}

export { login };
