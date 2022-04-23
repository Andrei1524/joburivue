async function createJob(axios: any, payload: any) {
  try {
    const response = await axios.post("/jobs/create", { ...payload });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getJob(axios: any, id: any) {
  try {
    const response = await axios.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { createJob, getJob };
