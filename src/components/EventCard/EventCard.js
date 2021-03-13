import React from "react";
import { Route, Link } from "react-router-dom";
import "./EventCard.scss";
const EventCard = ({ evento, cssClass }) => {
  console.log(evento.title);
  const { title, date, hour, place, _id, eventImg } = evento;
  return (
    <Route>
      <Link to={`/eventos/${_id}`}>
        <article className={cssClass}>
          <div
            className="eventImg"
            style={{ backgroundImage: `url("${eventImg}")` }}
          ></div>
          <div className="content">
            <h3 className="cardTitle ">{title}</h3>
            <p className="detail body2">{date}</p>
            <p className="detail body2">{hour}</p>
            <p className="place body2">{place}</p>
          </div>
        </article>
      </Link>
    </Route>
  );
};

export default EventCard;
