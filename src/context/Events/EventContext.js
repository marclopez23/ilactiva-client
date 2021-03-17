import React, { createContext, useState, useEffect, useCallback } from "react";
import { saveUser, useAuth } from "../../context/Auth/AuthContext.utils";
import {
  getEvent,
  getEvents,
  editEvent,
  deleteEvent,
  joinEvent,
  createEvent,
} from "../../service/event.service";

export const EventContext = createContext({});

function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const { user, setUser } = useAuth();
  useEffect(() => {
    const fetchEvents = getEvents().then(({ data }) => {
      setEvents([...data]);
    });
  }, []);

  const bringEvent = useCallback(async (id) => {
    try {
      const fetchEvent = await getEvent(id);
      return fetchEvent;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const newEvent = useCallback(async (info) => {
    try {
      const postEvent = await createEvent(info);
      const { event: newEvent } = postEvent.data;
      console.log(newEvent);
      setEvents((state) => [...state, newEvent]);
      return newEvent;
    } catch (e) {
      console.log(e);
      return "Algo ha salido mal, porfavor vuelve a intentarlo";
    }
  }, []);

  const registerEvent = useCallback(async (id) => {
    try {
      const enterEvent = await joinEvent(id);
      let newEventsList = [];
      console.log(user);
      if (user.eventsJoined.length > 0 && user.eventsJoined.indexOf(id) > -1) {
        const index = user.eventsJoined.indexOf(id);
        newEventsList = user.eventsJoined.splice(index, 1);
      } else {
        console.log("adeu");
        newEventsList = [...user.eventsJoined];
      }
      console.log(newEventsList);
      setUser((state) => ({
        ...state,
        eventsJoined: newEventsList,
      }));
      saveUser({ ...user, eventsJoined: newEventsList });
      console.log(user);
      return enterEvent;
    } catch (e) {
      console.log(e);
      return "Algo ha salido mal, porfavor vuelve a intentarlo";
    }
  }, []);

  return (
    <EventContext.Provider
      value={{ events, bringEvent, newEvent, setEvents, registerEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventProvider;
