const User = require("./model/user.model");

async function login() {
  try {
    // const users = await User.find(query);
    // return users;
    return "logged in next";
  } catch (e) {
    // Log Errors
    throw Error("Error while logging in");
  }
}

export { login };
