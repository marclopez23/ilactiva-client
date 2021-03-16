import React, { useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import cruz from "../../assets/cruz.svg";
import { useParams } from "react-router-dom";
import { useEvents } from "../../context/Events/EventsContext.utils";
import { useAuth } from "../../context/Auth/AuthContext.utils";

const Event = () => {
  const [event, setEvent] = useState({});
  const [creator, setCreator] = useState({});
  const { bringEvent } = useEvents();
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuth();
  useEffect(() => {
    const fetchEvent = bringEvent(id).then(({ data }) => {
      setEvent(data.event);
      setCreator(data.event.creator);
    });
  }, []);
  return (
    <main className="eventPage">
      <svg className="svgImg">
        <clipPath id="eventImg" clipPathUnits="objectBoundingBox">
          <path d="M0,0.879 V0 H0.112 H0.469 H1 V0.706 V1 H0.07 C0.055,1,0.041,0.989,0.031,0.97 L0.01,0.926 C0.003,0.912,0,0.896,0,0.879"></path>
        </clipPath>
      </svg>
      <section
        className="eventImg"
        style={{ backgroundImage: `url(${event.eventImg})` }}
      >
        <div className="cross">
          <img
            src={cruz}
            className="close"
            alt="close"
            onClick={() => history.goBack()}
          />
        </div>
      </section>
      <section className="creator">
        <div className="infoCreator">
          <img src={creator.profileImg} alt="creador" className="creatorImg" />
          <div>
            <p className="body2">{creator.name}</p>
            <p className="caption">Organizador/a</p>
          </div>
        </div>
        {creator._id === user.id ? (
          <button className="follow">Editar</button>
        ) : (
          <button className="follow">Seguir</button>
        )}
      </section>
      <section className="content">
        <div className="mainInfo">
          <h1 className="title">{event.title}</h1>
          <p className="caption categoria">{event.category}</p>
        </div>

        <p className="subheader">
          {event.free ? "Evento Gratuito" : `Coste ${event.price}€`}
        </p>

        <p className="body1">
          {event.date} de {event.hour} a {event.end}
        </p>
        <p className="body1">
          <span className="body2">Lugar: </span>
          {event.place}
        </p>
        <p className="body1">
          <span className="body2">Nª de asistentes: </span>
          {event.maxUsers}
        </p>
        <p className="body1">{event.description}</p>
      </section>
    </main>
  );
};

export default Event;
