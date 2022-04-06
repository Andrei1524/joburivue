interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  refreshToken: string;
}

interface LoginInterface {
  email: string;
  password: string;
}

export { RegisterInterface, LoginInterface };
