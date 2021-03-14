import React, { useEffect, useState } from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";
import EventForm from "../../components/Forms/EventForm/EventForm";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";

const CreateEvent = () => {
  const { newEvent } = useEvents();
  const [topMargin, setTop] = useState(0);

  useEffect(() => {
    const headerHeight = document.querySelector(".simpleHeader").offsetHeight;
    setTop(headerHeight);
  }, [topMargin]);
  return (
    <main>
      <SimpleHeader title="Escoge la categoría" />
      <article style={{ marginTop: topMargin }}>
        <EventForm onSubmit={newEvent} />
      </article>
    </main>
  );
};

export default CreateEvent;
