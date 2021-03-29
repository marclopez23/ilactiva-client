import React, { useState } from "react";
import "./Home.scss";
import { Link, Route } from "react-router-dom";
import cross from "../../assets/cruz.svg";

const Home = () => {
  const [hub, setHub] = useState(true);
  return (
    <>
      <main className="homepage">
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
        <article className="hub" style={{ bottom: hub ? 0 : -1000 }}>
          <img
            src={cross}
            alt=""
            className="cruz"
            onClick={() => setHub(false)}
          />
          <div>
            <h1 className="cardTitle">¡Hola!</h1>
            <p>
              Antes de que empiezas a navegar, por favor dedica un momento a
              leer esto.
            </p>
            <p>
              Este proyecto pretende mostrar eventos y comercios en el distrito
              de Barcelona de cuál es el usuario, por este motivo se filtran los
              eventos por distrito. Esto me lleva a comentarte dos cosas:
            </p>
            <ul>
              <li>
                Al tratarse de un prototipo solo el distrito de Sants Montjuïc
                tiene contenido. Por eso te recomiendo que lo utilizes.
              </li>
              <li>Los eventos que aparecen no son reales.</li>
            </ul>
            <p>Muchas gracias y disfruta de illactiva</p>
            <p className="pd">
              P.D: pueden existir algunos problemas con las restricciones de
              cookies de Safari o dispositivos iOS.
            </p>
          </div>
        </article>
        <section
          className="overlay"
          style={{ display: hub ? "block" : "none" }}
        ></section>
      </main>
    </>
  );
};

export default Home;
