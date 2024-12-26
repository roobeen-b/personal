import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", formData);

  return data;
}

export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function imageUploadService(formData) {
  const { data } = await axiosInstance.post("/project/image-upload", formData);

  return data;
}

export async function fetchAllProjectsService() {
  const { data } = await axiosInstance.get("/project");

  return data;
}

export async function addNewProjectService(formData) {
  const { data } = await axiosInstance.post("/project/add", formData);

  return data;
}

export async function editProjectService({ formData, id }) {
  const { data } = await axiosInstance.put(`/project/edit/${id}`, formData);

  return data;
}

export async function deleteProjectService(id) {
  const { data } = await axiosInstance.delete(`/project/delete/${id}`);

  return data;
}

export async function fetchAllSkillsService() {
  const { data } = await axiosInstance.get("/skill");

  return data;
}

export async function addNewSkillService(formData) {
  const { data } = await axiosInstance.post("/skill/add", formData);

  return data;
}

export async function editSkillService({ formData, id }) {
  const { data } = await axiosInstance.put(`/skill/edit/${id}`, formData);

  return data;
}

export async function deleteSkillService(id) {
  const { data } = await axiosInstance.delete(`/skill/delete/${id}`);

  return data;
}

export async function fetchAllCategoryService() {
  const { data } = await axiosInstance.get("/category");

  return data;
}

export async function addNewCategoryService(formData) {
  const { data } = await axiosInstance.post("/category/add", formData);

  return data;
}

export async function editCategoryService({ formData, id }) {
  const { data } = await axiosInstance.put(`/category/edit/${id}`, formData);

  return data;
}

export async function deleteCategoryService(id) {
  const { data } = await axiosInstance.delete(`/category/delete/${id}`);

  return data;
}
