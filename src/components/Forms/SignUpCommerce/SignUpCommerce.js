import React, { useState } from "react";
import "../Form.scss";
import { uploadFileService } from "../../../service/upload.service";
import "../SignUpForm/SignUpForm.scss";
import SimpleHeader from "../../SimpleHeader/SimpleHeader";
import hide from "../../../assets/hide.svg";
import unhide from "../../../assets/unhide.svg";
import FormFooter from "../../FormFooter/FormFooter";

const SignUpForm = ({ onSubmit }) => {
  const initialState = {
    email: "",
    password: "",
    name: "",
    direction: "",
    neighbourhood: "",
    category: "",
    profileImg: "",
    description: "",
    tags: [],
    schedule: [],
    instagram: "",
    facebook: "",
    twitter: "",
    isCommerce: true,
    file: "",
    web: "",
  };

  const [info, setInfo] = useState(initialState);
  const [step, setStep] = useState(1);
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(unhide);
  const [inputType, setType] = useState("password");
  const [imageReady, setImageReady] = useState(false);
  const maxStep = 3;

  const handleIcon = () => {
    if (icon === unhide) {
      setIcon(hide);
      setType("text");
    } else {
      setIcon(unhide);
      setType("password");
    }
  };

  const handleUpload = async (e) => {
    setImageReady(false);
    console.log(e.target.files[0]);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    const { data } = await uploadFileService(uploadData);
    console.log("File uploaded :>> ", data);
    setInfo({ ...info, profileImg: data });
    setImageReady(true);
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
    console.log(scheduleClicked);
    const newSchedule = info.schedule.filter(
      (schedule) => schedule !== scheduleClicked
    );
    console.log(newSchedule);
    setInfo((state) => ({ ...state, schedule: newSchedule }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step === 5) {
      onSubmit({ ...info });
      setInfo(initialState);
      setStep(1);
    } else {
      setStep((state) => (state += 1));
    }
  };
  const handleText = (event) => {
    const { value } = event.target;
    setText(value);
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
      if (
        info.profileImg !== "" &&
        info.name !== "" &&
        info.email !== "" &&
        info.password !== ""
      ) {
        return false;
      } else {
        return true;
      }
    } else if (step === 2) {
      return info.direction.length === 0;
    } else if (step === 3) {
      return info.category.length === 0;
    }
  };
  const handleBack = (event) => {
    event.preventDefault();
    if (step > 0) {
      setStep((state) => (state = state - 1));
    }
  };
  return (
    <article className="signForm" style={{ marginTop: 100 }}>
      <form action="" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="personal-info">
            <SimpleHeader title="Cuéntanos sobre tí" />
            {info.profileImg === "" && !imageReady ? (
              <input
                type="file"
                name="file"
                id="file"
                value={info.file}
                onChange={handleUpload}
              />
            ) : (
              <img
                src={info.profileImg}
                alt="logo"
                width="200"
                height="200"
                id="file"
              />
            )}
            <label htmlFor="name">¿Comó se llama tu negocio?</label>
            <input
              type="text"
              name="name"
              id="name"
              value={info.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="text"
              name="email"
              id="email"
              value={info.email}
              onChange={handleChange}
              required
            />
            <div className="password">
              <label htmlFor="password">Contraseña</label>
              <input
                type={inputType}
                name="password"
                id="password"
                value={info.password}
                onChange={handleChange}
                required
              />
              <img
                className="field-icon"
                src={icon}
                alt=""
                onClick={() => handleIcon()}
              />
            </div>
            <article className="requeriments">
              <ul className="body1">
                <li>Tiene que contener una mayúscula</li>
                <li>Tiene que contener un número</li>
                <li>Tiene que tener 8 carácteres como mínimo</li>
              </ul>
            </article>
            <FormFooter
              back={false}
              handleBack={handleBack}
              step={step}
              next={"Siguiente"}
              onClick={handleSubmit}
              maxStep={maxStep}
              disable={handleNext()}
            ></FormFooter>
          </div>
        )}
        {step === 2 && (
          <div className="location">
            <p>
              Puedes incluir los distintos horarios que tienes en tu negocio.
              Pulsa intro para guardar el Horario
            </p>
            <label htmlFor="schedule">Horario</label>
            <input
              type="text"
              name="schedule"
              id="schedule"
              value={text}
              onChange={handleText}
            />
            <button onClick={(event) => saveIt("schedule", event)}>Save</button>
            <div className="horario">
              {info.schedule.map((schedule) => (
                <p key={schedule} onClick={() => deleteSchedule(schedule)}>
                  {schedule}
                </p>
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
            <label htmlFor="direction">Dinos tu dirección</label>
            <input
              type="text"
              name="direction"
              id="direction"
              value={info.direction}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {step === 3 && (
          <div className="category">
            <label htmlFor="category">¿Qué tipo de negoció tienes?</label>
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
            <input
              type="text"
              name="tags"
              id="tags"
              value={info.text}
              onChange={handleText}
              required
            />
            <button onClick={(event) => saveIt("tags", event)}>Save</button>
            <div className="tags">
              {info.tags.map((tag) => (
                <p key={tag} onClick={() => deleteTags(tag)}>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="socials">
            <label htmlFor="description">
              ¿Como le explicarias tu negocio a los usuarios?
            </label>
            <input
              type="textarea"
              name="description"
              id="description"
              value={info.description}
              onChange={handleChange}
            />
            <p>Si quieres dinos cuales són las redes de tu negocio</p>
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
        )}
      </form>
    </article>
  );
};

export default SignUpForm;
