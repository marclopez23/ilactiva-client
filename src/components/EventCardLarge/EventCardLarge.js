import React from "react";
import { Route, Link } from "react-router-dom";
import "./EventCardLarge.scss";

const EventCardLarge = ({ event }) => {
  return (
    <Route>
      <Link to={`/eventos/${event._id}`}>
        <article className="eventoLarge">
          <div
            className="imgEvent"
            style={{ backgroundImage: `url("${event.eventImg}")` }}
          ></div>
          <div className="eventInfo">
            <h4 className="cardTitle">{event.title}</h4>
            <p className="body2 date">{event.date}</p>
            <p className="body2 hour">
              {event.hour} - {event.end}
            </p>
            <p className="body2 place">{event.place}</p>
          </div>
        </article>
      </Link>
    </Route>
  );
};

export default EventCardLarge;
