import React from "react";
import "./Menu.scss";
import { Route, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import logo from "../../assets/logo.svg";

const Menu = () => {
  const { user } = useAuth();
  return (
    <nav className="menu wrapper">
      <div className="logo">
        <Route>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Route>
      </div>

      <ul className="menu-items">
        <li>
          <Route>
            <Link to="/eventos">Eventos</Link>
          </Route>
        </li>
        <li>
          <Route>
            <Link to="/comercios">Comercios</Link>
          </Route>
        </li>
        {user.isLogged ? (
          <>
            <li>
              <Route>
                <Link to="/perfil">
                  <img src={user.avatar} alt="" width="30" />{" "}
                  {user.name.substring(0, user.name.indexOf(" "))}
                </Link>
              </Route>
            </li>{" "}
            <li>
              <Route>
                <Link to="/cerrar-sesion">Cerrar sesión</Link>
              </Route>
            </li>
          </>
        ) : (
          <>
            <li>
              <Route>
                <Link to="/iniciar-sesion">Conectarme</Link>
              </Route>
            </li>{" "}
            <li className="highlighted">
              <Route>
                <Link to="/registrarme">Registrarme</Link>
              </Route>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
