export const useAuthStore = defineStore('auth', () => {
  const user = ref();

  function setUser(user) {
    user.value = user;
  }

  return { user, setUser };
});

// In Setup Stores:

// ref()s become state properties
// computed()s become getters
// function()s become actions
