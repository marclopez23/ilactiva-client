import axios from "axios";

const projectApi = axios.create({
  baseURL: "http://localhost:4000/upload",
});

export const uploadFileService = (file) => projectApi.post("/", file);
