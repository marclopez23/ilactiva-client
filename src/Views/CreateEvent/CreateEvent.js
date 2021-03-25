import React, { useEffect, useState } from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";
import EventForm from "../../components/Forms/EventForm/EventForm";

const CreateEvent = () => {
  const { newEvent } = useEvents();
  const [topMargin, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
  }, [topMargin]);
  return (
    <main>
      <article style={{ marginTop: topMargin }}>
        <EventForm onSubmit={newEvent} />
      </article>
    </main>
  );
};

export default CreateEvent;
