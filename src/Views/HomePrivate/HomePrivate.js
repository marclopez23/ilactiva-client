import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useEvents } from "../../context/Events/EventsContext.utils";
import "./HomePrivate.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import Header from "../../components/Header/Header";
import EventCard from "../../components/EventCard/EventCard";
import marker from "../../assets/marker.svg";

const HomePrivate = () => {
  const [eventsList, setEvents] = useState([]);
  const { events } = useEvents();
  const { user } = useAuth();
  const [topMargin, setTop] = useState(0);
  useEffect(() => {
    setEvents(events);
  }, [events]);

  useEffect(() => {
    const headerHeight = document.querySelector(".header").offsetHeight;
    setTop(headerHeight + 24);
  }, []);

  return (
    <main>
      <Header
        headline={"¿Qué te apetece hacer?"}
        subheader={`¡Hola, ${user.name}!`}
      />
      <section className="contenido" style={{ marginTop: topMargin }}>
        <h4>
          <img src={marker} alt="" className="marker" />
          Lo que esta pasando en <span>{user.neighbourhood}</span>
        </h4>
        <article className="proximas">
          <div className="topSection">
            <h2 className="title">Próximas actividades</h2>
            <Route>
              <Link className="link" to="/eventos/proximos">
                Ver todas
              </Link>
            </Route>
          </div>
          <div className="eventsList">
            {eventsList.map((evento, index) =>
              index === eventsList.length - 1 ? (
                <EventCard
                  key={evento._id}
                  evento={evento}
                  cssClass="eventCard last"
                />
              ) : (
                <EventCard
                  key={evento._id}
                  evento={evento}
                  cssClass="eventCard"
                />
              )
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default HomePrivate;
