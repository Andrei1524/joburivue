import { toRaw } from 'vue';

export const useFetchData = async (url: string, config = {}) => {
  const generalStore = useGeneralStore();
  const authStore = useAuthStore();
  const accessToken = toRaw(authStore.accessToken);

  if (!url) return new Error('no url provided');

  const { data, error, pending } = await useFetch(
    'http://localhost:4000/api/v1' + url,
    {
      ...config,
      headers: { Authorization: `Bearer ${accessToken._value || accessToken}` },
    }
  );

  if (error.value) {
    generalStore.setAlert({
      text: error.value.data.message || error.value.message,
      show: true,
    });
  }

  return { data, error, pending };
};
