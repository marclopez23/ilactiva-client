import React from "react";
import error from "../../assets/404.svg";
import { Link, Route } from "react-router-dom";
import "./ErrorPage.scss";

const ErrorPage = ({title}) => {
  return (
    <main className="page404">
      <img src={error} alt="error" />
      <h2 className="body">
        {title}
      </h2>
      <Route>
        <Link to="/">Volver al inicio</Link>
      </Route>
    </main>
  );
};

export default ErrorPage;
