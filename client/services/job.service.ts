async function saveJob(vm, axios: any, payload: any) {
  try {
    await axios.post("/jobs/create", { ...payload });
  } catch (error) {
    throw Error;
  }
}
export { saveJob };
