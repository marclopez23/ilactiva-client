import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useEvents } from "../../context/Events/EventsContext.utils";
import { getCommerces } from "../../service/commerce.service.js";
import "./HomePrivate.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import Header from "../../components/Header/Header";
import EventCard from "../../components/EventCard/EventCard";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";
import CommerceCard from "../../components/CommerceCard/CommerceCard";
import marker from "../../assets/marker.svg";
import Empty from "../../components/Empty/Empty";

const HomePrivate = () => {
  const [eventsList, setEvents] = useState([]);
  const [commerces, setCommerces] = useState([]);
  const [likedEvents, setLiked] = useState([]);
  const [commerceEvents, setCommerceEvents] = useState([]);
  const [max, setMax] = useState(9);
  const { events } = useEvents();
  const { user } = useAuth();
  const [topMargin, setTop] = useState(0);
  useEffect(() => {
    setEvents(
      events.filter(
        (event) =>
          new Date() < new Date(event.date) && event.creator !== user.id
      )
    );
    setLiked(
      events.filter(
        (event) =>
          new Date() < new Date(event.date) &&
          event.creator !== user.id &&
          user.category.includes(event.category)
      )
    );
    setCommerceEvents(
      events.filter(
        (event) =>
          new Date() < new Date(event.date) &&
          event.creator !== user.id &&
          event.onModel === "Commerce"
      )
    );
  }, [events]);

  useEffect(() => {
    const num = window.outerWidth > 1200 ? 4 : 9;
    setMax(num);
    const headerHeight = document.querySelector(".header").offsetHeight;
    setTop(headerHeight + 24);
  }, [window]);

  useEffect(() => {
    getCommerces().then(({ data: { commerces } }) =>
      setCommerces(commerces.filter((commerce) => commerce._id !== user.id))
    );
  }, []);

  return (
    <main>
      <Header
        headline={"¿Qué te apetece hacer?"}
        subheader={`¡Hola, ${user.name}!`}
      />
      <section className="contenidoHome" style={{ marginTop: topMargin }}>
        <h4 className="barrio">
          <img src={marker} alt="" className="marker" />
          Lo que esta pasando en <span>{user.neighbourhood}</span>
        </h4>
        <article className="proximas">
          <div className="topSection">
            <h2 className="title">Próximas actividades</h2>
            <Route>
              <Link className="link" to="/eventos-proximos">
                Ver todas
              </Link>
            </Route>
          </div>
          <div className="eventsList">
            {eventsList
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              )
              .slice(0, max)
              .map((evento, index) =>
                index === 8 || index === eventsList.length - 1 ? (
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
        <article className="gustar">
          <div className="topSection">
            <h2 className="title">Te recomendamos ...</h2>
            <Route>
              <Link className="link" to="/eventos-recomendados">
                Ver todas
              </Link>
            </Route>
          </div>
          <div className="eventsList">
            {likedEvents.length > 0 ? (
              likedEvents
                .slice(0, max)
                .map((evento, index) =>
                  index === 8 || index === likedEvents.length - 1 ? (
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
                )
            ) : (
              <Empty txt="No hay ningún evento que se ajuste a tus gustos" />
            )}
          </div>
        </article>
      </section>
      <section className="zone">
        <article className="comercios">
          <h2 className="title">Descubre los comercios cerca de ti</h2>
          <div className="eventsList">
            {commerces
              .slice(0, 9)
              .filter((commerce) => !user.following.includes(commerce._id))
              .map((commerce, index) =>
                index === 8 || index === commerces.length - 1 ? (
                  <CommerceCard
                    commerce={commerce}
                    key={commerce._id}
                    cssClass="commerceCard last"
                  />
                ) : (
                  <CommerceCard
                    commerce={commerce}
                    key={commerce._id}
                    cssClass="commerceCard"
                  />
                )
              )}
          </div>
        </article>
      </section>
      <section className="contenidoHome end">
        <article className="eventosComercio">
          <h2 className="title">¿Qué organizan los comercios?</h2>
          <div className="eventsCommerce">
            {commerceEvents.length > 0 ? (
              commerceEvents
                .slice(0, 4)
                .map((evento) => (
                  <EventCardLarge
                    key={evento._id}
                    event={evento}
                    cssClass="eventCard"
                  />
                ))
            ) : (
              <Empty txt="Ningún comercio en tu zona ha creado eventos" />
            )}
          </div>
        </article>
        {commerceEvents.length > 2 && (
          <article className="more">
            <Route>
              <Link to="/eventos-comercios">
                <button className="more">Descubre más</button>
              </Link>
            </Route>
          </article>
        )}
      </section>
    </main>
  );
};

export default HomePrivate;
