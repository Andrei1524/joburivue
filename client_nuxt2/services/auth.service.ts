// TODO: add type for register payload
async function registerUser(axios: any, payload: any) {
  try {
    await axios.post("/auth/register", { ...payload });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function loginUser(vm: any, payload: any) {
  try {
    await vm.$auth.loginWith("local", { data: payload });
  } catch (error) {
    return Promise.reject(error);
  }
}
export { registerUser, loginUser };
