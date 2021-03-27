import React from "react";
import "./Header.scss";
const Header = ({ subheader, headline }) => {
  return (
    <section className="header">
      <svg className="svg">
        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0,0.803 V0 H0.112 H0.469 H1 V0.519 V1 H0.07 C0.055,1,0.041,0.982,0.031,0.951 L0.01,0.879 C0.004,0.857,0,0.83,0,0.803"></path>
        </clipPath>
      </svg>
      <div>
        <h3 className="subheader">{subheader}</h3>
        <h2 className="headline">{headline}</h2>
      </div>
    </section>
  );
};

export default Header;
