import React from "react";
import { Route, Link } from "react-router-dom";
import "./EventCardLarge.scss";
import PriceTag from "../PriceTag/PriceTag";

const EventCardLarge = ({ event }) => {
  const handleDate = (dateEvent) => {
    const dias = {
      0: "Domingo",
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
    };
    const mes = {
      0: "Enero",
      1: "Febrero",
      2: "Marzo",
      3: "Abril",
      4: "Mayo",
      5: "Junio",
      6: "Julio",
      7: "Agosto",
      8: "Septiembre",
      9: "Octubre",
      10: "Noviembre",
      11: "Diciembre",
    };
    let date = new Date(dateEvent);
    const day = date.getUTCDay();
    const monthDay = date.getUTCDate();
    const month = date.getUTCMonth();
    return `${dias[day]} ${monthDay} de ${mes[month]}`;
  };
  return (
    <Route>
      <Link to={`/evento/${event._id}`}>
        <article className="eventoLarge">
          <div
            className="imgEvent"
            style={{ backgroundImage: `url("${event.eventImg}")` }}
          >
            {event.price > 0 && <PriceTag />}
          </div>
          <div className="eventInfo">
            <h4 className="cardTitle">{event.title}</h4>
            <p className="body2 date">{handleDate(event.date)}</p>
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
