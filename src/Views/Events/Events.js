import React, { useEffect, useState } from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";
import "./Events.scss";

const Events = () => {
  const [eventsList, setEvents] = useState([]);
  const { events } = useEvents();
  useEffect(() => {
    setEvents(events);
  }, []);
  return (<main>
    
  </main>);
};

export default Events;
