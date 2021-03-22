import React, { useState } from "react";
import "./ProfileHeader.scss";
const ProfileHeader = ({ img, title }) => {
  const [show, setShow] = useState("block");
  if (document.querySelector(".perfilHeader")) {
    window.onscroll = function (e) {
      if (50 < this.scrollY) {
        return setShow("none");
      }
      this.oldScroll = this.scrollY;
      return setShow("block");
    };
  }
  return (
    <section className="perfilHeader">
      <svg className="svg">
        <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
          <path d="M0,0.803 V0 H0.112 H0.469 H1 V0.519 V1 H0.07 C0.055,1,0.041,0.982,0.031,0.951 L0.01,0.879 C0.004,0.857,0,0.83,0,0.803"></path>
        </clipPath>
      </svg>
      <img
        style={{ display: show }}
        src={img}
        alt="logo"
        width="200"
        height="200"
        className="fotoPerfil"
      />
      <h3 className="title">{title}</h3>
    </section>
  );
};

export default ProfileHeader;
