interface UserInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  refreshToken: string;
}

export { UserInterface };
