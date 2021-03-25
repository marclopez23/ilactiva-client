import axios from "axios";

const userApi = axios.create({
  baseURL: `${process.env.REACT_APP_API}/user`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getUser = () => userApi.get("/");

export const edit = (info) => userApi.patch("/edit", info);

export const followCommerce = (id) => userApi.patch(`/follow/${id}`);
