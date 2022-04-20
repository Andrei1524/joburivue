async function createJob(axios: any, payload: any) {
  try {
    await axios.post("/jobs/create", { ...payload });
  } catch (error) {}
}

async function getJob(axios: any, id: any) {
  try {
    await axios.get(`/jobs/${id}`);
  } catch (error) {}
}

export { createJob, getJob };
