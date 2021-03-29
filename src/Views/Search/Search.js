import React, { useState, useEffect } from "react";
import "./Search.scss";
import Header from "../../components/Header/Header";
import CategorySelector from "../../components/CategorySelector/CategorySelector";
import { useEvents } from "../../context/Events/EventsContext.utils";
import EventCardLarge from "../../components/EventCardLarge/EventCardLarge";
import Tag from "../../components/Tag/Tag";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import Empty from "../../components/Empty/Empty";
import {
  talleres,
  charlas,
  cine,
  deportes,
  exposiciones,
  infantil,
  musica,
  quedadas,
  visitas,
  espectaculos,
} from "../../assets/category/index";
import Loader from "../../components/Loader/Loader";

const Search = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const [eventos, setEventos] = useState([]);
  const [categoria, setCategoria] = useState(undefined);
  const [result, setResult] = useState([]);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setEventos([
      ...events
        .filter(
          (event) =>
            new Date() < new Date(event.date) && event.creator !== user.id
        )
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    ]);
  }, [events]);
  const categories = [
    { category: "talleres", img: talleres, text: "Talleres" },
    { category: "charlas", img: charlas, text: "Charlas" },
    { category: "cine", img: cine, text: "Cine" },
    { category: "deportes", img: deportes, text: "Deportes" },
    { category: "exposiciones", img: exposiciones, text: "Rxposiciones" },
    { category: "infantil", img: infantil, text: "Infantil" },
    { category: "música", img: musica, text: "Música" },
    { category: "quedadas", img: quedadas, text: "Quedadas" },
    { category: "Visitas y tours", img: visitas, text: "Visitas y tours" },
    { category: "espectaculos", img: espectaculos, text: "Espectáculos" },
  ];
  const handleSelected = (cat) => {
    setCategoria(cat);
    setResult([...eventos.filter((evento) => evento.category.includes(cat))]);
  };
  const checkLoader = () => {
    const imageLoaded = number + 1;

    if (imageLoaded <= categories.length) {
      setNumber(imageLoaded);
    }
  };
  return (
    <main className="searchEvents" style={{ marginTop: "150px" }}>
      <Header subheader={"Buscador"} headline={"Encuentra tu actividad"} />
      {categoria ? (
        <>
          <Tag txt={categoria} onClick={() => setCategoria(undefined)} />
          <article className="resultados">
            {result.length > 0 ? (
              result.map((evento) => (
                <EventCardLarge
                  key={evento._id}
                  event={evento}
                  cssClass="eventCard"
                />
              ))
            ) : (
              <Empty txt="Oooh, lo sentimos pero actualmente no hay ningún envento de esta categoria en tu zona" />
            )}
          </article>
        </>
      ) : (
        <>
          <article
            style={{ display: number !== categories.length ? "block" : "none" }}
          >
            <Loader />
          </article>

          <article
            className="categoriesDiv"
            style={{ display: number === categories.length ? "flex" : "none" }}
          >
            {categories.map(({ category, img, text }) => (
              <CategorySelector
                title={category}
                text={text}
                img={img}
                onClick={() => handleSelected(category)}
                key={category}
                load={checkLoader}
              />
            ))}
          </article>
        </>
      )}
    </main>
  );
};

export default Search;
