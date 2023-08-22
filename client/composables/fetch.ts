export const useFetchData = async (url: string, config = {}) => {
  const generalStore = useGeneralStore();

  if (!url) return new Error('no url provided');
  // const data = ref(null);
  // const pending = ref(false);
  // const error = ref(null);

  const { data, error, pending } = await useFetch(
    'http://localhost:4000/api/v1' + url,
    config
  );

  if (error.value) {
    generalStore.setAlert({ text: error.value.message, show: true });
  }

  return { data, error, pending };
};
