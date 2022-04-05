// import User from "../model/user.model";

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

async function register() {
  try {
    // TODO: register user in DB
  } catch (e) {
    // Log Errors
    throw Error("Error while registering in");
  }
}

export { login, register };
