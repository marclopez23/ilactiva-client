import React, { useLayoutEffect, useState } from "react";
import creados from "../../assets/creados.svg";
import apuntados from "../../assets/apuntados.svg";
import "./Events.scss";
import Header from "../../components/Header/Header";
import { Route, Link } from "react-router-dom";
const Events = () => {
  const [topMargin, setTop] = useState(0);
  useLayoutEffect(() => {
    const headerHeight = document.querySelector(".header").offsetHeight;
    setTop(headerHeight + 24);
  }, []);
  return (
    <main>
      <section className="selectType" style={{ marginTop: topMargin }}>
        <Header
          headline={"Tus actividades"}
          subheader={`¡Conecta con tu barrio`}
        />
        <Route>
          <Link to={`/eventos/creados/`}>
            <article className="userTypeCard creados">
              <h3 className="title">Eventos Creados</h3>
              <p className="body2">¡Gestiona tus eventos!</p>
              <img src={creados} alt="creados" />
            </article>
          </Link>
        </Route>
        <Route>
          <Link to={`/eventos/apuntados/`}>
            <article className="userTypeCard apuntados">
              <h3 className="title">Asistiré</h3>
              <p className="body2">
                ¡Repasa las actividades a las que te has apuntado!
              </p>
              <img src={apuntados} alt="apuntados" />
            </article>
          </Link>
        </Route>
      </section>
    </main>
  );
};

export default Events;
