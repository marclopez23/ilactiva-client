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

const Search = () => {
  const { user } = useAuth();
  const { events } = useEvents();
  const [eventos, setEventos] = useState([]);
  const [categoria, setCategoria] = useState(undefined);
  const [result, setResult] = useState([]);
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
    { category: "talleres", img: talleres },
    { category: "charlas", img: charlas },
    { category: "cine", img: cine },
    { category: "deportes", img: deportes },
    { category: "exposiciones", img: exposiciones },
    { category: "infantil", img: infantil },
    { category: "música", img: musica },
    { category: "quedadas", img: quedadas },
    { category: "Visitas y tours", img: visitas },
    { category: "espectaculos", img: espectaculos },
  ];
  console.log(result.length);
  const handleSelected = (cat) => {
    setCategoria(cat);
    setResult([...eventos.filter((evento) => evento.category.includes(cat))]);
  };
  return (
    <main className="searchEvents" style={{ marginTop: "150px" }}>
      <Header subheader={"Buscador"} headline={"Encuentra tu actividad"} />
      {categoria ? (
        <>
          <Tag txt={categoria} onClick={() => setCategoria(undefined)} />
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
        </>
      ) : (
        <>
          <article className="categoriesDiv">
            {categories.map(({ category, img }) => (
              <CategorySelector
                title={category}
                img={img}
                onClick={() => handleSelected(category)}
                key={category}
              />
            ))}
          </article>
        </>
      )}
    </main>
  );
};

export default Search;
