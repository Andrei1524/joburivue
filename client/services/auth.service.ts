const AuthService = {
  registerUser: async () => {
    const { pending, error, data } = await useFetchData('test', {
      method: 'post',
    });
    return { pending, error, data };
  },
};

export default AuthService;
