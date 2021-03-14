import React from "react";
import "./FormFooter.scss";
import chevronRight from "../../assets/chevron-right.svg";
import chevronLeft from "../../assets/chevron-left.svg";
const FormFooter = ({ back, step, next, onClick, maxStep, handleBack }) => {
  return (
    <article className="formFooter">
      {back && (
        <button className="back" onClick={handleBack}>
          <img src={chevronLeft} alt="" />
          Atrás
        </button>
      )}
      <p className="steps">
        {step}/{maxStep}
      </p>
      <button className="next" onClick={onClick}>
        {next} <img src={chevronRight} alt="" />
      </button>
    </article>
  );
};

export default FormFooter;
