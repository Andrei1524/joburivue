import AuthService from '~/services/auth.service';

export default defineNuxtPlugin((nuxtApp) => {
  const AuthModules = { AuthService };

  return {
    provide: {
      api: AuthModules,
    },
  };
});
