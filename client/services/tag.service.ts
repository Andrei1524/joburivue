async function getAll(axios: any, payload: any) {
  try {
    const response = await axios.get(`/tags${payload}`);
    return response.data;
  } catch (error) {}
}

async function create(axios: any, payload: any) {
  try {
    const response = await axios.post("/tags/create", {
      ...payload,
    });
    return response.data;
  } catch (error) {}
}

export { getAll, create };
