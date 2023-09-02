import { UserInterface } from 'interfaces/general';

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig();

  let user = reactive({ value: {} as UserInterface });
  const accessToken = ref();
  const refreshToken = ref();

  //  AUTH COOKIES
  const userCookie = useCookie('user', {
    maxAge: 604800,
  });

  const accessTokenCookie = useCookie('accessToken', {
    httpOnly: config.public.NODE_ENV === 'dev' ? false : true,
    secure: config.public.NODE_ENV === 'dev' ? false : true,
    maxAge: 604800,
  });

  // TODO: set max age
  const refreshTokenCookie = useCookie('refreshToken', {
    httpOnly: config.public.NODE_ENV === 'dev' ? false : true,
    secure: config.public.NODE_ENV === 'dev' ? false : true,
    maxAge: 60 * 60 * 24 * 30,
  });

  function setUser(data: any, saveInCookies = false) {
    user.value = data;

    if (saveInCookies) {
      // set user in local storage for persisting of usage

      userCookie.value = data;
    }
  }

  function setAccessToken(data: any, saveInCookies = false) {
    accessToken.value = data;

    if (saveInCookies) {
      accessTokenCookie.value = data;
    }
  }

  function setRefreshToken(data: any, saveInCookies = false) {
    refreshToken.value = data;

    if (saveInCookies) {
      refreshTokenCookie.value = data;
    }
  }

  function isAuthenticated() {
    return user.value && Object.keys(user.value).length !== 0;
  }

  function clearAuthStates() {
    user.value = {} as UserInterface;
    accessToken.value = undefined;
    refreshToken.value = undefined;

    userCookie.value = undefined;
    accessTokenCookie.value = undefined;
    refreshTokenCookie.value = undefined;
  }

  return {
    user,
    setUser,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
    isAuthenticated,
    clearAuthStates,
  };
});
