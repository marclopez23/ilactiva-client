import React from "react";
import { useEvents } from "../../context/Events/EventsContext.utils";
import EventForm from "../../components/Forms/EventForm/EventForm";

const CreateEvent = () => {
  const { newEvent } = useEvents();
  return <EventForm onSubmit={newEvent} />;
};

export default CreateEvent;
