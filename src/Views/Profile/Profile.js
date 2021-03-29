import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { getUser } from "../../service/user.service";
import ListButton from "../../components/ListButton/ListButton";
import { Route, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import editar from "../../assets/editar.svg";
import compartir from "../../assets/compartir.svg";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Tag from "../../components/Tag/Tag";
import marker from "../../assets/marker.svg";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const { handleLogout } = useAuth();
  const [user, setUser] = useState({});
  const [topMargin, setTop] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const commerce = {
    info: "Información",
    nombre: "Nombre de tu negocio:",
    distrito: "Tu negocio esta en:",
  };
  const usuario = {
    info: "Información personal",
    nombre: "Nombre:",
    distrito: "Vives en:",
  };

  useEffect(() => {}, [window]);
  useEffect(() => {
    setLoading(true);
    getUser().then(({ data: { user } }) => {
      setUser({ ...user });
      setLoading(false);
      const num =
        window.outerWidth > 992
          ? setTop(0)
          : setTop(document.querySelector(".perfilHeader").offsetHeight + 40);
    });
  }, []);

  return (
    <main className="perfil" style={{ marginTop: topMargin }}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <ProfileHeader title={user.name} img={user.profileImg} />
          <section className="userInfo">
            <h2 className="title">
              {user.schedule ? commerce.info : usuario.info}
            </h2>
            <article>
              <div>
                <h4 className="cardTitle">
                  {user.schedule ? commerce.nombre : usuario.nombre}
                </h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4 className="cardTitle">Correo electrónico:</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4 className="cardTitle">
                  {user.schedule ? commerce.distrito : usuario.distrito}
                </h4>
                <p>{user.neighbourhood}</p>
              </div>
              {user.schedule ? (
                <>
                  <div className="descripcion">
                    <h2 className="cardTitle">Descripción:</h2>
                    <p className="body2">{user.description}</p>
                  </div>

                  <div className="tags">
                    <h2 className="cardTitle">Ofreces actividades de:</h2>
                    {user.tags &&
                      user.tags.map((tag) => (
                        <Tag className="tag" txt={tag} key={tag} />
                      ))}
                  </div>
                  <div className="horario">
                    <h2 className="cardTitle">Horarios de apertura</h2>
                    <ul>
                      {user.schedule &&
                        user.schedule.map((horario) => (
                          <li className="body2" key={horario}>
                            {horario}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="direccion">
                    <h2 className="cardTitle">Dirección</h2>
                    <div>
                      <img src={marker} alt="" className="marker" />
                      <p>{user.direction}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="cardTitle">
                      Te interesan actividades sobre:
                    </h4>
                    <ul>
                      {user.category &&
                        user.category.map((value) => (
                          <Tag txt={value} key={value} />
                        ))}
                    </ul>
                  </div>
                </>
              )}
            </article>
          </section>
          <section className="options">
            <Route>
              <Link to={`perfil/editar/${user._id}`}>
                <ListButton icon={editar} text={"Editar perfil"}></ListButton>
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
              Cerrar sesión
            </button>
          </section>
        </>
      )}
    </main>
  );
};

export default Profile;
