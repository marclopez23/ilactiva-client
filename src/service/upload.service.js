import axios from "axios";

const projectApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/upload`,
});

export const uploadFileService = (file) => projectApi.post("/", file);
