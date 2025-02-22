import React, { useEffect, useState } from "react";
import { Link, Route, useHistory, useParams } from "react-router-dom";
import cruz from "../../assets/cruz.svg";
import { useEvents } from "../../context/Events/EventsContext.utils";
import { useAuth, saveUser } from "../../context/Auth/AuthContext.utils";
import { followCommerce } from "../../service/user.service";
import Button from "../../components/Button/Button";
import "./Event.scss";
import marker from "../../assets/marker.svg";
import vecinos from "../../assets/vecinos.svg";
import Loader from "../../components/Loader/Loader";

const Event = () => {
  const [event, setEvent] = useState({});
  const [showHub, setHub] = useState(false);
  const [showHubJoin, setHubJoin] = useState(false);
  const [creator, setCreator] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [plazasLibres, setLibres] = useState(0);
  const { bringEvent, registerEvent, quitEvent } = useEvents();
  const { id } = useParams();
  const history = useHistory();
  const { user, setUser } = useAuth();
  let newInfo = user;
  const handleHub = (action) => {
    if (action === "join") {
      registerEvent(id);
      setHubJoin(false);
    }
  };
  const handleFollow = async () => {
    try {
      await followCommerce(creator._id);
      const currentFollowing = newInfo.following.includes(creator._id);
      currentFollowing
        ? (newInfo = {
            ...newInfo,
            following: newInfo.following.filter(
              (commerceId) => commerceId !== creator._id
            ),
          })
        : (newInfo = {
            ...newInfo,
            following: [...newInfo.following, creator._id],
          });
      saveUser({ ...user, following: newInfo.following });
      setUser((state) => ({
        ...state,
        user: { ...state.user, following: newInfo.following },
      }));
    } catch (e) {}
  };

  useEffect(() => {
    setLoading(true);
    bringEvent(id).then(({ data }) => {
      setEvent(data.event);
      setCreator(data.event.creator);
      setLibres(data.event.maxUsers - data.event.resgisteredUsers.length);
      setLoading(false);
    });
  }, []);
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
    <main className="eventPage">
      <svg className="svgImg">
        <clipPath id="eventImg" clipPathUnits="objectBoundingBox">
          <path d="M0,0.879 V0 H0.112 H0.469 H1 V0.706 V1 H0.07 C0.055,1,0.041,0.989,0.031,0.97 L0.01,0.926 C0.003,0.912,0,0.896,0,0.879"></path>
        </clipPath>
      </svg>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
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
              <img
                src={creator.profileImg}
                alt="creador"
                className="creatorImg"
              />
              <div>
                <p className="body2">{creator.name}</p>
                <p className="caption">Organizador/a</p>
              </div>
            </div>
            {user.isLogged && creator._id === user.id && (
              <Route>
                <Link to={`/evento/editar/${event._id}/`}>
                  <Button copy="Editar" primary={true} className="follow" />
                </Link>
              </Route>
            )}
            {event.onModel !== "User" && creator._id !== user.id && (
              <button className="follow" onClick={() => handleFollow()}>
                {user.following.includes(creator._id)
                  ? "Dejar de Seguir"
                  : "Seguir"}
              </button>
            )}
          </section>
          <section className="content">
            <div className="mainInfo">
              <h1 className="title">{event.title}</h1>
            </div>
            <p className="subheader">
              {event.free ? "Evento Gratuito" : `Coste ${event.price}€`}
            </p>
            <p className="body1 categoria">{event.category}</p>
            <div>
              <p className="body1 fecha">{handleDate(event.date)}</p>
              <p className="body1 hora">
                {event.hour} a {event.end}
              </p>
            </div>
            <p className="lugar">
              <img src={marker} alt="" className="marker" />
              <span className="body1">{event.place}</span>
            </p>
            {event.resgisteredUsers && (
              <div className="apuntados">
                <img src={vecinos} alt="" className="icon" />
                <p className="body2">{`Quedan ${plazasLibres} plazas libres`}</p>
              </div>
            )}
          </section>
          <section className="descripcion">
            <svg className="svgImg">
              <clipPath id="descriptionImg" clipPathUnits="objectBoundingBox">
                <path d="M0.998,0.109 V1 H0.885 H0.529 H-0.002 V0.294 V0 H0.923 C0.941,0,0.957,0.011,0.966,0.028 L0.992,0.082 C0.996,0.09,0.998,0.1,0.998,0.109"></path>
              </clipPath>
            </svg>
            <article className="descripcionText">
              <h2 className="cardTitle">Descripción del evento</h2>
              <p className="body1">{event.description}</p>
            </article>
          </section>
          <section
            className="fixedButton"
            style={{
              display: `${new Date() > new Date(event.date) && "none"}`,
            }}
          >
            {user.isLogged &&
              !user.eventsJoined.includes(id) &&
              (creator._id === user.id ? (
                <Button
                  copy="¡Eliminar!"
                  primary={true}
                  onClick={() => setHub(true)}
                />
              ) : (
                <Button
                  copy={
                    plazasLibres === 0
                      ? "Todas las plazas reservadas"
                      : "¡Apuntarme!"
                  }
                  primary={true}
                  onClick={() => registerEvent(id)}
                  disable={plazasLibres === 0}
                />
              ))}
            {user.isLogged && user.eventsJoined.includes(id) && (
              <Button
                copy="Desapuntarme"
                primary={true}
                onClick={() => setHubJoin(true)}
              />
            )}
            {!user.isLogged && (
              <Route>
                <Link to="/iniciar-sesion" className="primary">
                  Inicia sesión para apuntarte
                </Link>
              </Route>
            )}
          </section>
          <section
            className="overlay"
            style={{
              top: showHub || showHubJoin ? 0 : "-100vh",
              backgroundColor:
                showHub || showHubJoin ? "#000000c7" : "#00000000",
            }}
            onClick={() => setHub(false)}
          ></section>
          <section
            className="hub"
            style={{
              bottom: showHub ? 0 : "-300px",
            }}
          >
            <h2 className="title">¿Seguro que quieres eliminar este evento?</h2>
            <div className="buttons">
              <button className="noDelete" onClick={() => setHub(false)}>
                No
              </button>
              <button className="delete" onClick={() => quitEvent(id)}>
                Si
              </button>
            </div>
          </section>
          <section
            className="hub"
            style={{
              bottom: showHubJoin ? 0 : "-300px",
            }}
          >
            <h2 className="title">¿Seguro que quieres desapuntarte?</h2>
            <div className="buttons">
              <button className="noDelete" onClick={() => setHubJoin(false)}>
                No
              </button>
              <button className="delete" onClick={() => handleHub("join")}>
                Si
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Event;
