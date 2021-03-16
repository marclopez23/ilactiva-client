import axios from "axios";

const eventApi = axios.create({
  baseURL: `http://localhost:4000/events`,
  withCredentials: true,
});

export const getEvents = () => eventApi.get("/");

export const getEvent = (id) => eventApi.get(`/${id}`);

export const editEvent = (id, info) => eventApi.patch(`/edit/${id}`, info);

export const deleteEvent = (id) => eventApi.delete(`delete/${id}`);

export const createEvent = (info) => eventApi.post("/create", info);

export const joinEvent = (id) => eventApi.patch(`/join/${id}`);
