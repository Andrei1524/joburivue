import { nanoid } from "nanoid";

async function createCompany(axios: any, payload: any) {
  try {
    const logoFile = payload.logoFile;
    const formData = new FormData();
    const storageId = payload.storageId;

    formData.append("name", payload.name);
    formData.append("website", payload.website);
    formData.append("description", payload.description);

    if (payload._id) {
      formData.append("_id", payload._id);
    }

    if (logoFile) {
      formData.append("logoFile", logoFile);
    }

    if (payload.logo) {
      formData.append("logo", payload.logo);
    }

    if (storageId) {
      formData.append("storageId", storageId);
    } else {
      formData.append("storageId", nanoid(12));
    }

    const headers = { "Content-Type": "multipart/form-data" };
    const response = await axios.post(
      `/company/create/${storageId}`,
      formData,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getUserCompanies(axios: any) {
  try {
    const response = await axios.get("/company/userCompanies");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { createCompany, getUserCompanies };
