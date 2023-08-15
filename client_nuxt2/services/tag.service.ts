async function getAll(axios: any, payload: any) {
  try {
    const response = await axios.get(`/tags${payload}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function create(axios: any, payload: any) {
  try {
    const response = await axios.post("/tags/create", {
      ...payload,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { getAll, create };
