async function createJob(axios: any, payload: any) {
  try {
    await axios.post("/jobs/create", { ...payload });
  } catch (error) {}
}
export { createJob };
