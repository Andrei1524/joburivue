interface LoginInterface {
  email: string;
  password: string;
}

const AuthService = {
  registerUser: async ({ email, password }: LoginInterface) => {
    const { pending, error, data } = await useFetchData('/auth/login', {
      method: 'post',
      body: { email, password },
    });
    return { pending, error, data };
  },
};

export default AuthService;
