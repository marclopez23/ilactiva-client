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
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Tag from "../../components/Tag/Tag";

const Profile = () => {
  const { handleLogout } = useAuth();
  const [user, setUser] = useState({});
  const [topMargin, setTop] = useState(0);
  useEffect(() => {
    const headerHeight = document.querySelector(".perfilHeader").offsetHeight;
    setTop(headerHeight + 46);
  }, []);
  useEffect(() => {
    getUser().then(({ data: { user } }) => setUser({ ...user }));
  }, []);
  return (
    <main className="perfil">
      <ProfileHeader title={user.name} img={user.profileImg} />
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
            user.category.map((value) => <Tag txt={value} key={value} />)}
        </ul>
        <Route>
          <Link to={`perfil/editar/${user._id}`}>
            <ListButton icon={editar} text={"Editar perfil"}></ListButton>
          </Link>
        </Route>
        <Route>
          <Link to={`eventos/creados/`}>
            <ListButton
              icon={eventosCreados}
              text={"Actividades creadas"}
            ></ListButton>
          </Link>
        </Route>
        <Route>
          <Link to={`eventos/apuntados/`}>
            <ListButton icon={eventos} text={"Asistire a ..."}></ListButton>
          </Link>
        </Route>
        <Route>
          <Link to={`comercios/seguidos/`}>
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
