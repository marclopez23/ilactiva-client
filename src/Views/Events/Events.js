import React, { useEffect, useState } from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";

const Events = () => {
  const [eventsList, setEvents] = useState([]);
  const { events } = useEvents(); 
  useEffect(() => {
    setEvents(events);
  }, []);
  return <h1>hola</h1>;
};

export default Events;
