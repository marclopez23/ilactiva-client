import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoreEvents.scss";
import { getUser } from "../../service/user.service";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";
import Loader from "../../components/Loader/Loader";

const MoreEvents = () => {
  const { query, cuando } = useParams();
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (query === "creados") {
      getUser().then(
        ({
          data: {
            user: { eventsCreated },
          },
        }) => {
          cuando === "proximos"
            ? setEvents([
                ...eventsCreated.filter(
                  (event) => new Date() < new Date(event.date)
                ),
              ])
            : setEvents([
                ...eventsCreated.filter(
                  (event) => new Date() > new Date(event.date)
                ),
              ]);
          setLoading(false);
        }
      );
    } else if (query === "apuntados") {
      getUser().then(
        ({
          data: {
            user: { eventsJoined },
          },
        }) => {
          cuando === "proximos"
            ? setEvents([
                ...eventsJoined.filter(
                  (event) => new Date() < new Date(event.date)
                ),
              ])
            : setEvents([
                ...eventsJoined.filter(
                  (event) => new Date() > new Date(event.date)
                ),
              ]);
          setLoading(false);
        }
      );
    }
  }, []);

  return (
    <main className="moreEvents">
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <h1 className="headline">
            {query === "creados"
              ? cuando === "proximos"
                ? "Tus proximas actividades"
                : "Actividades realizadas"
              : cuando === "proximos"
              ? "Asistirás a ..."
              : "Has asistido a ..."}
          </h1>
          <section className="eventsList vertical" style={{ marginTop: 100 }}>
            <SimpleHeader
              title={
                query === "creados"
                  ? cuando === "proximos"
                    ? "Tus proximas actividades"
                    : "Actividades realizadas"
                  : cuando === "proximos"
                  ? "Asistirás a ..."
                  : "Has asistido a ..."
              }
            />
            <article>
              {events
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .slice(0, 3)
                .map((evento) => (
                  <EventCardLarge event={evento} key={evento._id} />
                ))}
            </article>
          </section>
        </>
      )}
    </main>
  );
};

export default MoreEvents;
