import NotificationService from "./notification.service";

async function registerUser(vm: any, axios: any) {
  try {
    await axios.post("/auth/register");
  } catch (error) {
    NotificationService(vm, error);
  }
}
export { registerUser };
