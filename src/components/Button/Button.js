import React from "react";
import "./Button.scss";

const Button = ({ onClick, copy, primary, disable }) => {
  return (
    <button
      className={primary ? "primary" : "secondary"}
      onClick={onClick ? () => onClick() : undefined}
      disabled={disable}
    >
      {copy}
    </button>
  );
};

export default Button;
