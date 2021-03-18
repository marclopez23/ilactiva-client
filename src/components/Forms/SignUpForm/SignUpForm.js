import React, { useState, useEffect } from "react";
import "../Form.scss";
import { uploadFileService } from "../../../service/upload.service";
import "./SignUpForm.scss";
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
    category: "",
    profileImg: "",
    file: "",
  };

  const distritos = [
    "Ciutat Vella",
    "Eixample",
    "Sants-Montjuïc",
    "Les Corts",
    "Sarrià-Sant Gervasi",
    "Gràcia",
    "Horta - Guinardó",
    "Nou Barris",
    "Sant Andreu",
    "Sant Martí",
  ];

  const [info, setInfo] = useState(initialState);
  const [step, setStep] = useState(1);
  const [imageReady, setImageReady] = useState(false);
  const [topMargin, setTop] = useState(0);
  const [icon, setIcon] = useState(unhide);
  const [inputType, setType] = useState("password");
  const maxStep = 3;
  console.log(info);
  const handleIcon = () => {
    if (icon === unhide) {
      setIcon(hide);
      setType("text");
    } else {
      setIcon(unhide);
      setType("password");
    }
  };

  useEffect(() => {
    const headerHeight = document.querySelector(".simpleHeader").offsetHeight;
    setTop(100);
  }, [topMargin]);

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

  const handleCategory = (cat) => {
    if (info.category.includes(cat)) {
      const newArr = info.category.filter((item) => item !== cat);
      console.log(newArr);
      setInfo((state) => ({ ...state, category: [...newArr] }));
    } else {
      setInfo((state) => ({ ...state, category: [...state.category, cat] }));
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    if (step > 0) {
      setStep((state) => (state = state - 1));
    }
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const handleFirst = () => {
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
  };

  const handleSecond = () => {
    return info.direction.length === 0;
  };

  return (
    <article className="signForm" style={{ marginTop: topMargin }}>
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
            <label htmlFor="name">¿Comó te llamas?</label>
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
              disable={handleFirst()}
            ></FormFooter>
          </div>
        )}
        {step === 2 && (
          <div className="location">
            <SimpleHeader title="¿En que distrito vives?" />
            {distritos.map((distrito) => (
              <article
                className="distrito"
                onClick={() =>
                  setInfo((state) => ({ ...state, direction: distrito }))
                }
                key={distrito}
              >
                <p className="title">{distrito}</p>
              </article>
            ))}
            <FormFooter
              back={true}
              handleBack={handleBack}
              step={step}
              next={"Siguiente"}
              onClick={handleSubmit}
              maxStep={maxStep}
              disable={handleSecond()}
            ></FormFooter>
          </div>
        )}
        {step === 3 && (
          <div className="category">
            <h2>¿en que eventos te gustaria participar?</h2>
            <h3 onClick={() => handleCategory("talleres")}>Talleres</h3>
            <h3 onClick={() => handleCategory("deporte")}>Deporte</h3>
            <h3 onClick={() => handleCategory("exposiciones")}>Exposiciones</h3>
            <FormFooter
              back={true}
              handleBack={handleBack}
              step={step}
              next={"Siguiente"}
              onClick={handleSubmit}
              maxStep={maxStep}
            ></FormFooter>
          </div>
        )}
        {step > 4 && (
          <article className="confirmation">
            <h2>Resumen de tus datos:</h2>
            <p>Nombre: {info.name}</p>
            <p>Correo electrónico: {info.email}</p>
            <p>Vives en: {info.direction}</p>
            <p>Te interesan eventos sobre:</p>
            <ul>
              {info.category.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
            <input type="submit" value="Resgistrarme" disabled={!imageReady} />
          </article>
        )}
      </form>
    </article>
  );
};

export default SignUpForm;
