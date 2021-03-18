import React from "react";
import { Route, Link } from "react-router-dom";
import "./ListButton.scss";
import chevronBig from "../../assets/chevronBig.svg";
const ListButton = ({ icon, text }) => {
  return (
    <article className="listButton">
      <div className="icon">
        <img src={icon} alt="button List" />
      </div>
      <p className="subheader">{text}</p>
      <img src={chevronBig} alt="chevron" className="chevron" />
    </article>
  );
};

export default ListButton;
