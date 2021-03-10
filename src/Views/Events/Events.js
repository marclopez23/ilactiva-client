import React, { useEffect, useState } from "react";
import { getEvents } from "../../service/event.service";

const Events = () => {
  const [events, setEvents] = useState([]);
  console.log(events);
  useEffect(() => {
    const fetchEvents = getEvents().then(({ data }) => setEvents(data));
  }, []);
  return <h1>HOla</h1>;
};

export default Events;
