import axios from "axios";

const commerceApi = axios.create({
  baseURL: `http://localhost:4000/commerces`,
  withCredentials: true,
});

export const getCommerces = (query) => commerceApi.get(`?${query}`);

export const getCommerce = (id) => commerceApi.get(`/${id}`);
