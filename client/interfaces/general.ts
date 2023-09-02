interface AlertInterface {
  text: string;
  show: boolean;
}

interface UserInterface {
  __v: number;
  _id: string;
  email: string;
  name: string;
  refreshToken: string;
}

export { AlertInterface, UserInterface };
