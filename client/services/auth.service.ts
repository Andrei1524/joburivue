interface LoginInterface {
  email: string;
  password: string;
}

const AuthService = {
  loginUser: async ({ email, password }: LoginInterface) => {
    const { pending, error, data } = await useFetchData('/auth/login', {
      method: 'post',
      body: { email, password },
    });
    return { pending, error, data };
  },

  getCurrentUser: async (accessToken: string) => {
    const { pending, error, data } = await useFetchData('/auth/me', {
      method: 'get',
    });
    return { pending, error, data };
  },

  logout: async () => {
    const { pending, error, data } = await useFetchData('/auth/logout', {
      method: 'post',
    });
    return { pending, error, data };
  },
};

export default AuthService;
