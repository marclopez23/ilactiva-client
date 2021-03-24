import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
import FormFooter from "../../FormFooter/FormFooter";
import SimpleHeader from "../../SimpleHeader/SimpleHeader";
import Confirmationform from "../../../Views/ConfirmationForm/ConfirmationForm";

const EventForm = ({ onSubmit }) => {
  const currentDay = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };
  const initialState = {
    title: "",
    description: "",
    eventImg: "",
    category: "",
    free: false,
    price: 0,
    date: currentDay(),
    file: "",
    hour: "",
    end: "",
    place: "",
    maxUsers: 0,
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
  //const [itsFree, setFree] = useState(false);
  const [step, setStep] = useState(1);
  const [makeRedirect, setRedirect] = useState(false);
  const [imageReady, setImageReady] = useState(true);
  const maxStep = 3;
  const handleCategory = (title) => {
    const cat = title.title;
    if (info.category === cat) {
      setInfo((state) => ({ ...state, category: "" }));
    } else {
      setInfo((state) => ({ ...state, category: cat }));
    }
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    const { data } = await uploadFileService(uploadData);
    setInfo({ ...info, eventImg: data });
    setImageReady(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step === 4) {
      await onSubmit({ ...info });
      setInfo(initialState);
      setStep(1);
      setImageReady(false);
      setRedirect(true);
    } else {
      setStep((state) => (state = state + 1));
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    if (step > 0) {
      setStep((state) => (state = state - 1));
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
    //setFree(checked);
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

  const handleNext = () => {
    if (step === 1) {
      return info.category === "";
    } else if (step === 2) {
      return !(info.date !== "" && info.hour !== "" && info.end !== "");
    } else if (step === 3) {
      return info.eventImg !== "" &&
        info.name !== "" &&
        info.description !== "" &&
        info.maxUser !== "" &&
        info.direction !== ""
        ? false
        : true;
    }
  };
  return (
    <>
      {makeRedirect && <Redirect to={`/evento/creado/`} />}
      <form action="" onSubmit={handleSubmit}>
        {step === 1 && (
          <article className="categories">
            <SimpleHeader title="Escoge la categoría" />
            {categories.map(({ category, img }) => (
              <CategorySelector
                title={category}
                img={img}
                onClick={handleCategory}
                key={category}
              />
            ))}
            <FormFooter
              back={false}
              step={step}
              next={"Siguiente"}
              onClick={handleSubmit}
              maxStep={maxStep}
              disable={handleNext()}
            ></FormFooter>
          </article>
        )}
        {step === 2 && (
          <article className="date">
            <SimpleHeader title="¿Cuando quieres hacerla?" />
            <label htmlFor="date">¿Qué día será?</label>
            <input
              type="date"
              name="date"
              id="date"
              value={info.date}
              min={currentDay()}
              onChange={handleChange}
              required
            />
            <label htmlFor="date">¿A que hora empieza?</label>
            <input
              type="time"
              name="hour"
              id="hour"
              value={info.hour}
              onChange={handleChange}
              required
            />
            <label htmlFor="date">¿A que hora acaba?</label>
            <input
              type="time"
              name="end"
              id="end"
              value={info.end}
              onChange={handleChange}
              required
            />
            <FormFooter
              back={true}
              handleBack={handleBack}
              step={step}
              next={"Siguiente"}
              onClick={handleSubmit}
              maxStep={maxStep}
              disable={handleNext()}
            ></FormFooter>
          </article>
        )}
        {step === 3 && (
          <article className="info">
            <SimpleHeader title="Cuéntanos más sobre la actividad" />
            <label htmlFor="title">Nombre de la Actividad</label>
            <input
              type="text"
              name="title"
              id="title"
              value={info.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">
              Descripción <span>(Máx 200 carácteres)</span>
            </label>
            <textarea
              maxLength="200"
              rows="5"
              cols="50"
              name="description"
              id="description"
              value={info.description}
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
            <label htmlFor="maxUsers">Nº máximo de plazas</label>
            <input
              type="number"
              name="maxUsers"
              id="maxUsers"
              value={info.maxUsers}
              onChange={handleChange}
              required
            />
            <div className="check">
              <label htmlFor="free">¿Es gratuita?</label>
              <input
                type="checkbox"
                name="free"
                id="free"
                value={info.free}
                onChange={handleFree}
              />
            </div>

            {!info.free && (
              <>
                <label htmlFor="price">Precio (€)</label>
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
            <FormFooter
              back={true}
              handleBack={handleBack}
              step={step}
              next={"Finalizar"}
              onClick={handleSubmit}
              maxStep={maxStep}
              disable={handleNext()}
            ></FormFooter>
          </article>
        )}
        {step === 4 && (
          <article className="confirmation">
            <SimpleHeader title="Revisa la información" />
            <Confirmationform info={info} />
            <div className="button">
              <input
                className="send"
                type="submit"
                value="Crear Evento"
                disabled={!imageReady}
              />
            </div>
          </article>
        )}
      </form>
    </>
  );
};

export default EventForm;
