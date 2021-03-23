import React, { useEffect, useState } from "react";
import { Route, Link, useParams } from "react-router-dom";
import "./UserEvents.scss";
import { getUser } from "../../service/user.service";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";
import Empty from "../../components/Empty/Empty";
const UserEvents = () => {
  const { query } = useParams();
  const [nextEvents, setNext] = useState([]);
  const [pastEvents, setPast] = useState([]);
  const [topMargin, setTop] = useState(0);

  useEffect(() => {
    console.log(query);
    if (query === "creados") {
      getUser().then(
        ({
          data: {
            user: { eventsCreated },
          },
        }) => {
          setNext([
            ...eventsCreated.filter(
              (event) => new Date() < new Date(event.date)
            ),
          ]);
          setPast([
            ...eventsCreated.filter(
              (event) => new Date() > new Date(event.date)
            ),
          ]);
        }
      );
    } else if (query === "apuntados") {
      getUser().then(
        ({
          data: {
            user: { eventsJoined },
          },
        }) => {
          setNext([
            ...eventsJoined.filter(
              (event) => new Date() < new Date(event.date)
            ),
          ]);
          setPast([
            ...eventsJoined.filter(
              (event) => new Date() > new Date(event.date)
            ),
          ]);
        }
      );
    }
  }, []);
  useEffect(() => {
    setTop(100);
  }, [topMargin]);
  return (
    <section className="eventsList" style={{ marginTop: topMargin }}>
      <SimpleHeader
        title={
          query === "creados"
            ? "Gestiona tus actividades"
            : "Te has apuntado a..."
        }
      />
      <article>
        <h2 className="cardTitle">Próximas actividades</h2>
        {nextEvents
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 3)
          .map((evento) => (
            <EventCardLarge event={evento} key={evento._id} />
          ))}
        {nextEvents.length > 3 && (
          <article className="more">
            <Route>
              <Link
                to={
                  query === "creados"
                    ? "/eventos/creados/proximos"
                    : "/eventos/apuntados/proximos"
                }
              >
                <button className="more">Descubre más</button>
              </Link>
            </Route>
          </article>
        )}
        {nextEvents.length === 0 && (
          <Empty txt="No hay ningún evento a la vista" />
        )}
      </article>
      <article>
        <h2 className="cardTitle">Actividades pasadas</h2>
        {pastEvents
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3)
          .map((evento) => (
            <EventCardLarge event={evento} key={evento._id} />
          ))}
        <article className="more">
          {pastEvents.length > 3 && (
            <Route>
              <Link
                to={
                  query === "creados"
                    ? "/eventos/creados/pasados"
                    : "/eventos/apuntados/pasados"
                }
              >
                <button className="more">Descubre más</button>
              </Link>
            </Route>
          )}
          {pastEvents.length === 0 && (
            <Empty txt="No tienes ningún evento pasado" />
          )}
        </article>
      </article>
    </section>
  );
};

export default UserEvents;
