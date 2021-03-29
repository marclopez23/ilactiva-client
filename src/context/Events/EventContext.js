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
    getEvents().then(({ data }) => {
      setEvents([...data]);
      console.log(data);
    });
  }, []);

  const bringEvent = async (id) => {
    try {
      const fetchEvent = await getEvent(id);
      return fetchEvent;
    } catch (e) {}
  };

  const newEvent = useCallback(async (info) => {
    try {
      const postEvent = await createEvent(info);
      const { event: newEvent } = postEvent.data;

      setEvents((state) => [...state, newEvent]);
      return newEvent;
    } catch (e) {
      return "Algo ha salido mal, porfavor vuelve a intentarlo";
    }
  }, []);

  const registerEvent = async (eventId) => {
    try {
      const {
        data: { event: evento },
      } = await joinEvent(eventId);
      const currentEventIndex = user.eventsJoined.includes(eventId);

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
      return "Algo ha salido mal, porfavor vuelve a intentarlo";
    }
  };

  const quitEvent = async (id) => {
    try {
      await deleteEvent(id);
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
    } catch (e) {}
  };

  const eventEdit = async (id, info) => {
    try {
      const {
        data: { updatedEvent },
      } = await editEvent(id, info);

      const newList = events.filter((event) => event._id !== id);
      setEvents([...newList, updatedEvent]);
    } catch (e) {}
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
