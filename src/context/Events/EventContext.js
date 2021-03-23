import React, { createContext, useState, useEffect, useCallback } from "react";
import { saveUser, useAuth } from "../../context/Auth/AuthContext.utils";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const { user, setUser } = useAuth();
  useEffect(() => {
    const fetchEvents = getEvents().then(({ data }) => {
      setEvents([...data]);
    });
  }, []);

  const bringEvent = async (id) => {
    try {
      console.log("hola");
      const fetchEvent = await getEvent(id);
      return fetchEvent;
    } catch (e) {
      console.log(e);
    }
  };

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

  const registerEvent = async (eventId) => {
    try {
      const {
        data: { event: evento },
      } = await joinEvent(eventId);
      const currentEventIndex = user.eventsJoined.includes(eventId);
      console.log("id", evento._id);

      if (currentEventIndex) {
        setUser((state) => ({
          ...state,
          user: {
            ...state.user,
            eventsJoined: state.user.eventsJoined.filter(
              (event) => event !== eventId
            ),
          },
        }));
        saveUser({
          ...user,
          eventsJoined: user.eventsJoined.filter((event) => event !== eventId),
        });
      } else {
        setUser((state) => ({
          ...state,
          user: {
            ...state.user,
            eventsJoined: state.user.eventsJoined.concat(evento._id),
          },
        }));
        saveUser({
          ...user,
          eventsJoined: user.eventsJoined.concat(evento._id),
        });
      }
    } catch (e) {
      console.log(e);
      return "Algo ha salido mal, porfavor vuelve a intentarlo";
    }
  };

  const quitEvent = async (id) => {
    try {
      const deleted = await deleteEvent(id);
      setUser((state) => ({
        ...state,
        user: {
          ...state.user,
          eventsCreated: state.user.eventsCreated.filter(
            (event) => event !== id
          ),
        },
      }));
      setEvents((state) => state.filter((evento) => evento._id !== id));
      history.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const eventEdit = async (id, info) => {
    try {
      const {
        data: { updatedEvent },
      } = await editEvent(id, info);
      console.log(updatedEvent);
      const newList = events.filter((event) => event._id !== id);
      setEvents([...newList, updatedEvent]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        bringEvent,
        newEvent,
        setEvents,
        registerEvent,
        quitEvent,
        eventEdit,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventProvider;
