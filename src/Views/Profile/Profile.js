import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { getUser } from "../../service/user.service";
import ListButton from "../../components/ListButton/ListButton";
import { Route, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import eventosCreados from "../../assets/eventosCreados.svg";
import eventos from "../../assets/eventos.svg";
import editar from "../../assets/editar.svg";
import compartir from "../../assets/compartir.svg";

const Profile = () => {
  if (document.querySelector(".perfil")) {
    window.onscroll = function (e) {
      if (50 < this.scrollY) {
        return setShow("none");
      }
      this.oldScroll = this.scrollY;
      return setShow("block");
    };
  }
  const { handleLogout } = useAuth();
  const [show, setShow] = useState("block");
  const [user, setUser] = useState({});
  const [topMargin, setTop] = useState(0);
  useEffect(() => {
    const headerHeight = document.querySelector(".header").offsetHeight;
    setTop(headerHeight + 46);
  }, []);
  useEffect(() => {
    const currentUser = getUser().then(({ data: { user } }) =>
      setUser({ ...user, hashedPassword: "not for you" })
    );
  }, []);
  return (
    <main className="perfil">
      <section className="header">
        <svg className="svg">
          <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
            <path d="M0,0.803 V0 H0.112 H0.469 H1 V0.519 V1 H0.07 C0.055,1,0.041,0.982,0.031,0.951 L0.01,0.879 C0.004,0.857,0,0.83,0,0.803"></path>
          </clipPath>
        </svg>
        <img
          style={{ display: show }}
          src={user.profileImg}
          alt="logo"
          width="200"
          height="200"
          className="fotoPerfil"
        />
        <h3 className="title">{user.name}</h3>
      </section>
      <section className="userInfo" style={{ marginTop: topMargin }}>
        <h2 className="title">Información personal</h2>
        <h4 className="cardTitle">Nombre:</h4>
        <p>{user.name}</p>
        <h4 className="cardTitle">Correo electrónico:</h4>
        <p>{user.email}</p>
        <h4 className="cardTitle">Vives en:</h4>
        <p>{user.neighbourhood}</p>
        <h4 className="cardTitle">Te interesan actividades sobre:</h4>
        <ul>
          {user.category &&
            user.category.map((value) => (
              <li className="categoria caption" key={value}>
                {value}
              </li>
            ))}
        </ul>
        <Route>
          <Link to={`perfil/editar/${user._id}`}>
            <ListButton icon={editar} text={"Editar perfil"}></ListButton>
          </Link>
        </Route>
        <Route>
          <Link to={`eventos/creados/${user._id}`}>
            <ListButton
              icon={eventosCreados}
              text={"Actividades creadas"}
            ></ListButton>
          </Link>
        </Route>
        <Route>
          <Link to={`eventos/apuntado/${user._id}`}>
            <ListButton icon={eventos} text={"Asistire a ..."}></ListButton>
          </Link>
        </Route>
        <Route>
          <Link to={`perfil/seguidos/${user._id}`}>
            <ListButton
              icon={compartir}
              text={"Comercios seguidos"}
            ></ListButton>
          </Link>
        </Route>
        <button className="logout" onClick={() => handleLogout()}>
          Cerrar sessión
        </button>
      </section>
    </main>
  );
};

export default Profile;
