import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEvents } from "../../context/Events/EventsContext.utils";

const Event = () => {
  const [event, setEvent] = useState({});

  const { bringEvent } = useEvents();

  const { id } = useParams();
  useEffect(() => {
    const fetchEvent = bringEvent(id).then(({ data }) => setEvent(data.event));
  }, []);
  console.log(event);
  return <h1>Event</h1>;
};

export default Event;
