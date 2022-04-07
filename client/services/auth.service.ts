async function registerUser(axios: any) {
  await axios.post("/auth/register");
}
export { registerUser };
