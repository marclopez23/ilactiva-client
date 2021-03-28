import React from "react";
import "./ConfirmationForm.scss";
const ConfirmationForm = ({ info }) => {
  const {
    title,
    description,
    eventImg,
    category,
    free,
    price,
    date,
    hour,
    end,
    place,
    maxUsers,
  } = info;

  return (
    <>
      <section
        className="eventImg"
        style={{ backgroundImage: `url(${eventImg})` }}
      ></section>
      <section className="content">
        <h1 className="title">{title}</h1>
        <h3 className="subheader">{category}</h3>
        <p className="body1">
          {date} de {hour} a {end}
        </p>
        <p className="body1">
          <span className="body2">Lugar: </span>
          {place}
        </p>
        <p className="body1">
          <span className="body2">Nª de asistentes: </span>
          {maxUsers}
        </p>
        <p className="body1">{free ? "Evento Gratuito" : `Coste ${price}€`}</p>
        <p className="body1">{description}</p>
      </section>
    </>
  );
};

export default ConfirmationForm;
