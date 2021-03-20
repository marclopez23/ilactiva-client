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

  const registerEvent = async (id) => {
    try {
      const enterEvent = await joinEvent(id);
      const currentEventIndex = user.eventsJoined.includes(id);
      console.log(currentEventIndex);
      if (currentEventIndex) {
        setUser((state) => ({
          ...state,
          user: {
            ...state.user,
            eventsJoined: state.user.eventsJoined.filter(
              (event) => event !== id
            ),
          },
        }));
        return;
      }
      setUser((state) => ({
        ...state,
        user: {
          ...state.user,
          eventsJoined: state.user.eventsJoined.concat(enterEvent._id),
        },
      }));
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

  return (
    <EventContext.Provider
      value={{
        events,
        bringEvent,
        newEvent,
        setEvents,
        registerEvent,
        quitEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventProvider;
