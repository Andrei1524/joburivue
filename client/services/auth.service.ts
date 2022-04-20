// TODO: add type for register payload
async function registerUser(axios: any, payload: any) {
  try {
    await axios.post("/auth/register", { ...payload });
  } catch (error) {
    throw Error;
  }
}

async function loginUser(vm: any, payload: any) {
  try {
    await vm.$auth.loginWith("local", { data: payload });
  } catch (error) {
    throw Error;
  }
}
export { registerUser, loginUser };
