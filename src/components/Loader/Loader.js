import React from "react";
import LoaderGif from "../../assets/loader.gif";
import "./Loader.scss";
const Loader = () => {
  return <img src={LoaderGif} alt="loading..." className="loader" />;
};

export default Loader;
