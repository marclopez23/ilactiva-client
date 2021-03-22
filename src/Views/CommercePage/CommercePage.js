import React, { useState, useEffect } from "react";
import { getCommerce } from "../../service/commerce.service";
import { useParams, Route, Link } from "react-router-dom";
import { followCommerce } from "../../service/user.service";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import marker from "../../assets/marker.svg";
import Tag from "../../components/Tag/Tag";
import "./CommercePage.scss";
import { useAuth, saveUser } from "../../context/Auth/AuthContext.utils";

const CommercePage = () => {
  const { user, setUser } = useAuth();
  const { id } = useParams();
  const [commerce, setCommerce] = useState({});
  const [topMargin, setTop] = useState(0);
  let newInfo = user;
  const handleFollow = async () => {
    try {
      await followCommerce(id);
      const currentFollowing = newInfo.following.includes(id);
      currentFollowing
        ? (newInfo = {
            ...newInfo,
            following: newInfo.following.filter(
              (commerceId) => commerceId !== id
            ),
          })
        : (newInfo = {
            ...newInfo,
            following: [...newInfo.following, id],
          });
      console.log({ ...user, following: newInfo.following });
      saveUser({ ...user, following: newInfo.following });
      setUser((state) => ({
        ...state,
        user: { ...state.user, following: newInfo.following },
      }));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCommerce(id).then(({ data }) => setCommerce({ ...data }));
  }, []);
  useEffect(() => {
    const headerHeight = document.querySelector(".perfilHeader").offsetHeight;
    setTop(headerHeight + 32);
  }, []);

  return (
    <main className="commercePage">
      <ProfileHeader title={commerce.name} img={commerce.profileImg} />
      <section className="userInfo" style={{ marginTop: topMargin }}>
        <article className="descripcion">
          <h2 className="cardTitle">Sobre nosotros</h2>
          <p className="body2">{commerce.description}</p>
        </article>

        <article className="tags">
          <h2 className="cardTitle">Ofrecemos actividades de:</h2>
          {commerce.tags &&
            commerce.tags.map((tag) => (
              <Tag className="tag" txt={tag} key={tag} />
            ))}
        </article>
        <article className="horario">
          <h2 className="cardTitle">Horarios de apertura</h2>
          <ul>
            {commerce.schedule &&
              commerce.schedule.map((horario) => (
                <li className="body2" key={horario}>
                  {horario}
                </li>
              ))}
          </ul>
        </article>
        <article className="direccion">
          <h2 className="cardTitle">Dirección</h2>
          <div>
            <img src={marker} alt="" className="marker" />
            <p>{commerce.direction}</p>
          </div>
        </article>
        <article className="fixedButton">
          {user.isLogged && user.id !== commerce._id ? (
            user.following.includes(commerce._id) ? (
              <button className="follow" onClick={() => handleFollow()}>
                Dejar de seguir
              </button>
            ) : (
              <button className="follow" onClick={() => handleFollow()}>
                Seguir
              </button>
            )
          ) : null}
          {!user.isLogged && (
            <Route>
              <Link to="/iniciar-sesion" className="follow">
                Inicia sesión para seguir a este negocio
              </Link>
            </Route>
          )}
        </article>
      </section>
    </main>
  );
};

export default CommercePage;
