async function getAll(axios: any, payload: any) {
  try {
    const response = await axios.get(`/tags${payload}`);
    return response.data;
  } catch (error) {}
}

export { getAll };
