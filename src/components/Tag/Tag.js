import React from "react";
import "./Tag.scss";
import cross from "../../assets/cruz.svg";

const Tag = ({ txt, onClick }) => {
  return (
    <li className="tag caption" onClick={onClick ? () => onClick() : null}>
      {txt}
      {onClick && (
        <span className="delete">
          <img src={cross} alt="delete tag" />
        </span>
      )}
    </li>
  );
};

export default Tag;
