import { UserInterface } from 'interfaces/general';

export const useAuthStore = defineStore('auth', () => {
  let user = reactive({ value: {} as UserInterface });
  const accessToken = ref();
  const refreshToken = ref();

  function setUser(data: any) {
    user.value = data;
  }

  function setAccessToken(data: string) {
    accessToken.value = data;
  }

  function setRefreshToken(data: string) {
    refreshToken.value = data;
  }

  function isAuthenticated() {
    return Object.keys(user.value).length !== 0;
  }

  return {
    user,
    setUser,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isAuthenticated,
  };
});
