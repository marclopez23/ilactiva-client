import React, { useState } from "react";
import "../Form.scss";
import { uploadFileService } from "../../../service/upload.service";
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
} from "../../../assets/category/index";
import "./EventForm.scss";
import CategorySelector from "../../CategorySelector/CategorySelector";

const EventForm = ({ onSubmit }) => {
  const initialState = {
    title: "",
    description: "",
    eventImg: "",
    category: "",
    free: false,
    price: 0,
    date: "",
    file: "",
    hour: "",
    place: "",
  };
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

  const [info, setInfo] = useState(initialState);
  const [itsFree, setFree] = useState(false);
  const [step, setStep] = useState(1);

  const [imageReady, setImageReady] = useState(true);
  console.log(info);
  const handleCategory = (title) => {
    const cat = title.title;
    console.log(cat);
    if (info.category.includes(cat)) {
      const newArr = info.category.filter((item) => item !== cat);
      console.log(newArr);
      setInfo((state) => ({ ...state, category: [...newArr] }));
    } else {
      setInfo((state) => ({ ...state, category: [...state.category, cat] }));
    }
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    console.log(e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    const { data } = await uploadFileService(uploadData);
    console.log("File uploaded :>> ", data);
    setInfo({ ...info, eventImg: data });
    setImageReady(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 4) {
      onSubmit({ ...info });
      setInfo(initialState);
      setStep(1);
      setImageReady(false);
    } else {
      setStep((state) => (state = state + 1));
    }
  };

  const handleFree = (event) => {
    const { checked, name } = event.target;
    if (!checked) {
      setInfo((state) => ({
        ...state,
        price: 0,
      }));
    }
    console.log(checked);
    setFree(checked);
    setInfo((state) => ({
      ...state,
      [name]: checked,
    }));
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      {step === 1 && (
        <article className="categories">
          {categories.map(({ category, img }) => (
            <CategorySelector
              title={category}
              img={img}
              onClick={handleCategory}
              key={category}
            />
          ))}
        </article>
      )}
      {step === 2 && (
        <>
          <label htmlFor="title">Nombre de la Actividad</label>
          <input
            type="text"
            name="title"
            id="title"
            value={info.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Descripción</label>
          <input
            type="textarea"
            name="description"
            id="description"
            value={info.description}
            onChange={handleChange}
            required
          />
          <label htmlFor="category">Escoge el tipo de actividad:</label>
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
            <option value="quedadas">Quedadas</option>
            <option value="charlas">Charlas</option>
            <option value="otros">Otros</option>
          </select>
          <label htmlFor="date">¿Que día lo organizas?</label>
          <input
            type="date"
            name="date"
            id="date"
            value={info.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">¿A que hora sera?</label>
          <input
            type="time"
            name="hour"
            id="hour"
            value={info.hour}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">¿Dónde?</label>
          <input
            type="text"
            name="place"
            id="place"
            value={info.place}
            onChange={handleChange}
            required
          />
          <label htmlFor="free">¿Es gratuita?</label>
          <input
            type="checkbox"
            name="free"
            id="free"
            value={info.title}
            onChange={handleFree}
          />
          {!info.free && (
            <>
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                name="price"
                id="price"
                value={info.price}
                onChange={handleChange}
                required
              />
            </>
          )}
          <label htmlFor="file">Foto de Evento</label>
          <input
            type="file"
            name="file"
            id="file"
            value={info.file}
            onChange={handleUpload}
          />

          <input type="submit" value="Crear Evento" disabled={!imageReady} />
        </>
      )}
    </form>
  );
};

export default EventForm;
