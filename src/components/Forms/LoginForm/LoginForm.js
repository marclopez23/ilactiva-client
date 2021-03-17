import React, { useState } from "react";
import "../Form.scss";
import hide from "../../../assets/hide.svg";
import unhide from "../../../assets/unhide.svg";

const LoginForm = ({ onSubmit }) => {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [icon, setIcon] = useState(unhide);
  const [inputType, setType] = useState("password");

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

  const handleIcon = () => {
    if (icon === unhide) {
      setIcon(hide);
      setType("text");
    } else {
      setIcon(unhide);
      setType("password");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        name="email"
        id="email"
        value={info.email}
        onChange={handleChange}
        required
      />
      <div className="password">
        <label htmlFor="password">Contraseña</label>
        <input
          type={inputType}
          name="password"
          id="password"
          value={info.password}
          onChange={handleChange}
          required
        />
        <img
          className="field-icon"
          src={icon}
          alt=""
          onClick={() => handleIcon()}
        />
      </div>
      <input type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
