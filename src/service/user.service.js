import axios from "axios";

const userApi = axios.create({
  baseURL: `http://localhost:4000/user`,
  withCredentials: true,
});

export const getUser = () => userApi.get("/");

export const edit = (info) => userApi.patch("/edit", info);

export const followCommerce = (id) => userApi.patch(`/following/${id}`);



