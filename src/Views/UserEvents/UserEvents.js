import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../service/user.service";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";
const UserEvents = () => {
  const [events, setEvents] = useState([]);
  const [topMargin, setTop] = useState(0);
  console.log(events);
  useEffect(() => {
    const currentUser = getUser().then(
      ({
        data: {
          user: { eventsCreated },
        },
      }) => setEvents([...eventsCreated])
    );
  }, []);
  useEffect(() => {
    setTop(100);
  }, [topMargin]);
  return (
    <section className="eventsList" style={{ marginTop: topMargin }}>
      <SimpleHeader title="Gestiona tus actividades" />
      {events.map((evento) => (
        <EventCardLarge event={evento} key={evento._id} />
      ))}
    </section>
  );
};

export default UserEvents;
