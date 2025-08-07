import axios from "axios";

const BASE_URL = "http://localhost:8080/api/documents";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${BASE_URL}/upload`, formData);
};

export const getFiles = () => axios.get(BASE_URL);

export const downloadFile = (id) =>
  axios.get(`${BASE_URL}/${id}`, { responseType: "blob" });

export const deleteFile = (id) => axios.delete(`${BASE_URL}/${id}`);
