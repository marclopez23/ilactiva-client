import React from "react";
import euro from "../../assets/euro.svg";
import "./PriceTag.scss";
const PriceTag = () => {
  return (
    <div className="priceTag">
      <img src={euro} alt="euro tag" />
    </div>
  );
};

export default PriceTag;
