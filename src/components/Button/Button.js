import React from "react";
import "./Button.scss";

const Button = ({ onClick, copy, primary }) => {
  return (
    <button
      className={primary ? "primary" : "secondary"}
      onClick={onClick ? () => onClick() : undefined}
    >
      {copy}
    </button>
  );
};

export default Button;
