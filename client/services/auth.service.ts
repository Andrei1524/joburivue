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
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return { pending, error, data };
  },
};

export default AuthService;
