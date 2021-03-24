import React from "react";
import { Route, Link } from "react-router-dom";

const NavbarItem = ({ link, icon, active }) => {
  return (
    <Route>
      <Link to={link}>
        <article className={`navbarItem ${active && "active"}`}>
          <img src={icon} alt="icon navbar" />
        </article>
      </Link>
    </Route>
  );
};

export default NavbarItem;
