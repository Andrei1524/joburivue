import AuthService from '~/services/auth.service';
import JobService from '~/services/job.service';

export default defineNuxtPlugin((nuxtApp) => {
  const AuthModules = { AuthService, JobService };

  return {
    provide: {
      api: AuthModules,
    },
  };
});
