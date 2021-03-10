import React, { useState } from "react";
import "../Form.scss";

const EventForm = ({ onSubmit }) => {
  const initialState = {
    title: "",
    description: "",
    eventImg: "",
    category: "",
    free: "",
    price: "",
    location: "",
    date: "",
  };
  const [info, setInfo] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(info);
    setInfo(initialState);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="title">Nombre del Evento</label>
      <input
        type="text"
        name="title"
        id="title"
        value={info.title}
        onChange={handleChange}
        required
      />
      <label htmlFor="description">Descripción del evento</label>
      <input
        type="textarea"
        name="description"
        id="description"
        value={info.description}
        onChange={handleChange}
        required
      />
      <label htmlFor="title">Nombre del Evento</label>
      <input
        type="text"
        name="title"
        id="title"
        value={info.title}
        onChange={handleChange}
        required
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
