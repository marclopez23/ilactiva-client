import React from "react";
import cruz from "../../assets/cruz.svg";
import { useHistory } from "react-router-dom";
import "./SimpleHeader.scss";

const SimpleHeader = ({ title }) => {
  const history = useHistory();
  return (
    <section className="simpleHeader">
      <img
        src={cruz}
        className="close"
        alt="close"
        onClick={() => history.goBack()}
      />
      <h1 className="title">{title}</h1>
    </section>
  );
};

export default SimpleHeader;
