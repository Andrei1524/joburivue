async function createCompany(axios: any, payload: any) {
  try {
    const logoFile = payload.logoFile;
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("website", payload.website);
    formData.append("description", payload.website);

    formData.append("logoFile", logoFile);

    const headers = { "Content-Type": "multipart/form-data" };
    const response = await axios.post("/company/create", formData, { headers });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { createCompany };
