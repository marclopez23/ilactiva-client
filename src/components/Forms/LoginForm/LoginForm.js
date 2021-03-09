import React, { useState } from "react";
import "../Form.scss";

const LoginForm = ({ onSubmit }) => {
  const [info, setInfo] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(info);
    setInfo({ email: "", password: "" });
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
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={info.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={info.password}
        onChange={handleChange}
        required
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
