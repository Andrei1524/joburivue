import { UserInterface } from 'interfaces/general';

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();

  let user = reactive({ value: {} as UserInterface });
  const accessToken = ref();
  const refreshToken = ref();

  function setUser(data: any, saveInCookies = false) {
    user.value = data;

    if (saveInCookies) {
      // set user in local storage for persisting of usage
      const userCookie = useCookie('user', {
        maxAge: 604800,
      });
      userCookie.value = data;
    }
  }

  function setAccessToken(data: any, saveInCookies = false) {
    accessToken.value = data;

    if (saveInCookies) {
      // TODO: set max age
      const accessTokenCookie = useCookie('accessToken', {
        httpOnly: config.public.NODE_ENV === 'dev' ? false : true,
        secure: config.public.NODE_ENV === 'dev' ? false : true,
        maxAge: 604800,
      });
      accessTokenCookie.value = data;
    }
  }

  function setRefreshToken(data: any, saveInCookies = false) {
    refreshToken.value = data;

    if (saveInCookies) {
      // TODO: set max age
      const refreshTokenCookie = useCookie('refreshToken', {
        httpOnly: config.public.NODE_ENV === 'dev' ? false : true,
        secure: config.public.NODE_ENV === 'dev' ? false : true,
        maxAge: 60 * 60 * 24 * 30,
      });

      refreshTokenCookie.value = data;
    }
  }

  function isAuthenticated() {
    return user.value && Object.keys(user.value).length !== 0;
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
