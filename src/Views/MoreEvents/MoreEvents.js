import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MoreEvents.scss";
import { getUser } from "../../service/user.service";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";

const MoreEvents = () => {
  const { query, cuando } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
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
        }
      );
    }
  }, []);

  return (
    <main className="moreEvents">
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
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .slice(0, 3)
            .map((evento) => (
              <EventCardLarge event={evento} key={evento._id} />
            ))}
        </article>
      </section>
    </main>
  );
};

export default MoreEvents;
