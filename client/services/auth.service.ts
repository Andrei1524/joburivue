import { NotificationService } from "./notification.service";

// TODO: add type for register payload
async function registerUser(vm: any, axios: any, payload: any) {
  try {
    await axios.post("/auth/register", { ...payload });
    NotificationService.showSuccess(vm, null);
  } catch (error) {
    NotificationService.showError(vm, error);
    throw Error;
  }
}
export { registerUser };
