export const useAuthStore = defineStore('auth', () => {
  const user = ref();

  function setUser(user) {
    user.value = user;
  }

  return { user, setUser };
});
