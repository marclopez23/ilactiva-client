import React from "react";
import "./Home.scss";
import { Link, Route } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <section className="mainSection">
        <h1 className="homeHeader">Illactiva</h1>
        <p>
          Descubre, crea y participa en actividades dentro de tu barrio y
          potencia tu comunidad. Conecta con tu barrio y conoce a tus vecinos.
          ¡Regístrate y empieza a conectar!
        </p>
        <article className="mobile">
          <Route>
            <Link to="/iniciar-sesion">
              <button className="iniciar">Iniciar sesión</button>
            </Link>
          </Route>
          <Route>
            <Link to="/registrarme">
              {" "}
              <button className="registrarse">Regístrate</button>
            </Link>
          </Route>
        </article>
      </section>
    </main>
  );
};

export default Home;
