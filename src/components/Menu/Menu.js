import React from "react";
import "./Menu.scss";
import { Route, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import logo from "../../assets/logo.svg";

const Menu = () => {
  const { user } = useAuth();
  return (
    <nav className="menu ">
      <article className="wrapper">
        <div className="logo">
          <Route>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </Route>
        </div>

        <ul className="menu-items">
          {user.isLogged ? (
            <>
              <li>
                <Route>
                  <Link to="/buscar">Buscar</Link>
                </Route>
              </li>
              <li>
                <Route>
                  <Link to="/eventos">Actividades</Link>
                </Route>
              </li>
              <li>
                <Route>
                  <Link to="/crear-evento">Crear Actividad</Link>
                </Route>
              </li>
              <li>
                <Route>
                  <Link to="/perfil">
                    <img
                      className="menuImg"
                      src={user.avatar}
                      alt=""
                      width="30"
                    />{" "}
                    {user.name.substring(0, user.name.indexOf(" "))}
                  </Link>
                </Route>
              </li>{" "}
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
      </article>
    </nav>
  );
};

export default Menu;
