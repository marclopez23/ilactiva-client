import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../../service/user.service";
import "./EditProfile.scss";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import { edit } from "../../service/user.service";
import { uploadFileService } from "../../service/upload.service";
import { useAuth } from "../../context/Auth/AuthContext.utils";
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
import Tag from "../../components/Tag/Tag";
import CategorySelector from "../../components/CategorySelector/CategorySelector";
const categories = [
  { category: "talleres", img: talleres },
  { category: "charlas", img: charlas },
  { category: "cine", img: cine },
  { category: "deporte", img: deportes },
  { category: "exposiciones", img: exposiciones },
  { category: "infantil", img: infantil },
  { category: "música", img: musica },
  { category: "quedadas", img: quedadas },
  { category: "Visitas y tours", img: visitas },
  { category: "espectaculos", img: espectaculos },
];

const EditProfile = () => {
  const history = useHistory();
  const { setUser } = useAuth();
  useEffect(() => {
    getUser().then(({ data: { user } }) =>
      setInfo({
        ...user,
      })
    );
  }, []);

  const [info, setInfo] = useState({});
  const [topMargin, setTop] = useState(0);
  const [imageReady, setImageReady] = useState(true);
  const [error, setError] = useState();
  const [text, setText] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  useEffect(() => {
    setTop(100);
  }, [topMargin]);
  const handleUpload = async (e) => {
    setImageReady(false);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    const { data } = await uploadFileService(uploadData);
    setInfo({ ...info, profileImg: data });
    setImageReady(true);
  };

  const handleCategory = (cat) => {
    if (info.category.includes(cat)) {
      const newArr = info.category.filter((item) => item !== cat);
      setInfo((state) => ({ ...state, category: [...newArr] }));
    } else {
      setInfo((state) => ({ ...state, category: [...state.category, cat] }));
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await edit(info);
      setInfo(data.user);
      setUser((state) => ({
        user: { ...state.user, ...data.user },
      }));
      history.goBack();
    } catch (e) {
      setError(e.response.data.message);
    }
  };
  const handleText = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const saveIt = (key, e) => {
    e.preventDefault();
    setInfo((state) => ({ ...state, [key]: [...state[key], text] }));
    setText("");
  };

  const deleteTags = (tagClicked) => {
    const newTags = info.tags.filter((tag) => tag !== tagClicked);
    setInfo((state) => ({ ...state, tags: newTags }));
  };

  const deleteSchedule = (scheduleClicked) => {
    const newSchedule = info.schedule.filter(
      (schedule) => schedule !== scheduleClicked
    );
    setInfo((state) => ({ ...state, schedule: newSchedule }));
  };

  return (
    <main className="editProfile" style={{ marginTop: topMargin }}>
      <SimpleHeader title="Editar información" />
      <h1 className="headline">Edita tu información</h1>
      <img
        src={info.profileImg || ""}
        alt="logo"
        width="200"
        height="200"
        className="fotoPerfil"
      />
      <input
        type="file"
        name="file"
        id="file"
        value={info.file}
        onChange={handleUpload}
      />
      <form action="">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={info.name || ""}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={info.email || ""}
          onChange={handleChange}
          required
        />
        {info.schedule ? (
          <>
            <label htmlFor="schedule">Horario</label>
            <div className="inputAdd">
              <input
                type="text"
                name="schedule"
                id="schedule"
                value={text}
                onChange={handleText}
              />
              <button onClick={(event) => saveIt("schedule", event)}>
                Añadir
              </button>
            </div>

            <div className="horario">
              {info.schedule.map((schedule) => (
                <Tag
                  className="tag"
                  txt={schedule}
                  key={schedule}
                  onClick={() => deleteSchedule(schedule)}
                />
              ))}
            </div>
            <label htmlFor="neighbourhood">
              ¿En que distrito se ubica el negocio?
            </label>
            <select
              name="neighbourhood"
              id="neighbourhood"
              value={info.neighbourhood}
              onChange={handleChange}
              required
            >
              <option disabled={info.direction}>Escoge una opción</option>
              <option value="Ciutat Vella">Ciutat Vella</option>
              <option value="Eixample">Eixample</option>
              <option value="Sants-Montjuïc">Sants-Montjuïc</option>
              <option value="Les Corts">Les Corts</option>
              <option value="Sarrià-Sant Gervasi">Sarrià-Sant Gervasi</option>
              <option value="Gràcia">Gràcia</option>
              <option value="Horta - Guinardó">Horta - Guinardó</option>
              <option value="Nou Barris">Nou Barris</option>
              <option value="Sant Andreu">Sant Andreu</option>
              <option value="Sant Martí">Sant Martí</option>
            </select>
            <label htmlFor="direction">Dirección</label>
            <input
              type="text"
              name="direction"
              id="direction"
              value={info.direction}
              onChange={handleChange}
              required
            />
            <div className="category">
              <label htmlFor="category">Tipo de negoció</label>
              <select
                name="category"
                id="category"
                value={info.category}
                onChange={handleChange}
                required
              >
                <option disabled={info.direction}>Escoge una opción</option>
                <option value="talleres">Talleres</option>
                <option value="deportes">Deportes</option>
                <option value="exposiciones">Exposiciones</option>
                <option value="Visitas y tours">Visitas y tours</option>
                <option value="infatil">Infatil</option>
                <option value="espectáculos">Espectáculos</option>
                <option value="música">Música</option>
                <option value="otros">Otros</option>
              </select>
              <label htmlFor="tags">Tags</label>
              <div className="inputAdd">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  value={info.text}
                  onChange={handleText}
                  required
                />
                <button onClick={(event) => saveIt("tags", event)}>
                  Añadir
                </button>
              </div>
              <div className="tags">
                {info.tags.map((tag) => (
                  <Tag
                    className="tag"
                    txt={tag}
                    key={tag}
                    onClick={() => deleteTags(tag)}
                  />
                ))}
              </div>
            </div>
            <div className="socials">
              <label htmlFor="description">
                ¿Como le explicarias tu negocio a los usuarios?
              </label>
              <textarea
                rows="5"
                cols="50"
                name="description"
                id="description"
                value={info.description}
                onChange={handleChange}
              />
              <label htmlFor="web">Web</label>
              <input
                type="url"
                name="web"
                id="web"
                value={info.web}
                onChange={handleChange}
              />
              <label htmlFor="facebook">Facebook</label>
              <input
                type="url"
                name="facebook"
                id="facebook"
                value={info.facebook}
                onChange={handleChange}
              />
              <label htmlFor="twitter">Twitter</label>
              <input
                type="url"
                name="twitter"
                id="twitter"
                value={info.twitter}
                onChange={handleChange}
              />
              <label htmlFor="instagram">Instagram</label>
              <input
                type="url"
                name="instagram"
                id="instagram"
                value={info.instagram}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <label htmlFor="neighbourhood">Escoge tu distrito:</label>
            <select
              name="neighbourhood"
              id="neighbourhood"
              value={info.neighbourhood || ""}
              onChange={handleChange}
              required
            >
              <option disabled={info.neighbourhood}>Escoge una opción</option>
              <option value="Ciutat Vella">Ciutat Vella</option>
              <option value="Eixample">Eixample</option>
              <option value="Sants-Montjuïc">Sants-Montjuïc</option>
              <option value="Les Corts">Les Corts</option>
              <option value="Sarrià-Sant Gervasi">Sarrià-Sant Gervasi</option>
              <option value="Gràcia">Gràcia</option>
              <option value="Horta - Guinardó">Horta - Guinardó</option>
              <option value="Nou Barris">Nou Barris</option>
              <option value="Sant Andreu">Sant Andreu</option>
              <option value="Sant Martí">Sant Martí</option>
            </select>
            <label>¿Qué categorias te interesan?</label>
            <article className="categoriesDiv">
              {categories.map(({ category, img }) => (
                <CategorySelector
                  title={category}
                  isActive={
                    info.category !== undefined &&
                    info.category.includes(category)
                      ? true
                      : false
                  }
                  img={img}
                  onClick={() => handleCategory(category)}
                  key={category}
                />
              ))}
            </article>
          </>
        )}

        <input
          type="submit"
          value="Guardar cambios"
          className="enviar"
          disabled={!imageReady}
          onClick={handleSubmit}
        />
      </form>
      {error && <p className="error">{error}</p>}
    </main>
  );
};

export default EditProfile;
