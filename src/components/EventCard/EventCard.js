import React from "react";
import { Route, Link } from "react-router-dom";
import "./EventCard.scss";
const EventCard = ({ evento, cssClass }) => {
  const { title, date, hour, place, _id, eventImg } = evento;
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
      <Link to={`/evento/${_id}`}>
        <article className={cssClass}>
          <div
            className="eventImg"
            style={{ backgroundImage: `url("${eventImg}")` }}
          ></div>
          <div className="content">
            <h3 className="cardTitle ">{title}</h3>
            <p className="detail body2">{handleDate(date)}</p>
            <p className="detail body2">{hour}</p>
            <p className="place body2">{place}</p>
          </div>
        </article>
      </Link>
    </Route>
  );
};

export default EventCard;
