import axios from "axios";

const commerceApi = axios.create({
  baseURL: process.env.REACT_APP_API + `/commerces`,
  withCredentials: true,
});

export const getCommerces = (query) => commerceApi.get(`?${query}`);

export const getCommerce = (id) => commerceApi.get(`/${id}`);
