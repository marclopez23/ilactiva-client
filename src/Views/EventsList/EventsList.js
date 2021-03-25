import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import "./EventsList.scss";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";
import { useEvents } from "../../context/Events/EventsContext.utils";

const EventsList = () => {
  const { user } = useAuth();
  const { filtro } = useParams();
  const [eventsList, setEvents] = useState([]);
  const { events } = useEvents();
  useEffect(() => {
    if (filtro === "proximos") {
      setEvents([
        ...events.filter(
          (event) =>
            new Date() < new Date(event.date) && event.creator._id !== user.id
        ),
      ]);
    } else if (filtro === "comercios") {
      setEvents([
        ...events
          .filter((event) => new Date() < new Date(event.date))
          .filter((event) => event.creator !== user.id)
          .filter((event) => event.onModel === "Commerce"),
      ]);
    } else {
      setEvents(
        events.filter(
          (event) =>
            new Date() < new Date(event.date) &&
            event.creator !== user.id &&
            user.category.includes(event.category)
        )
      );
    }
  }, []);
  return (
    <main className="moreEvents home">
      <section className="eventsList" style={{ marginTop: 100 }}>
        <SimpleHeader
          title={
            filtro === "proximos"
              ? "Próximos eventos"
              : filtro === "comercios"
              ? "Eventos de los comercios"
              : "Te recomendamos"
          }
        />
        <article>
          {eventsList.map((evento) => (
            <EventCardLarge event={evento} key={evento._id} />
          ))}
        </article>
      </section>
    </main>
  );
};

export default EventsList;
