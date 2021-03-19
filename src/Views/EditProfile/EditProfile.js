import React, { useState, useEffect } from "react";
import { getUser } from "../../service/user.service";
import "./EditProfile.scss";
import SimpleHeader from "../../components/SimpleHeader/SimpleHeader";
import { edit } from "../../service/user.service";
import { uploadFileService } from "../../service/upload.service";
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
  useEffect(() => {
    getUser().then(
      ({
        data: {
          user: { profileImg, name, email, neighbourhood, category },
        },
      }) =>
        setInfo({
          profileImg,
          name,
          email,
          neighbourhood,
          category,
        })
    );
  }, []);

  const [info, setInfo] = useState({});
  const [topMargin, setTop] = useState(0);
  const [imageReady, setImageReady] = useState(true);
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
  console.log(info);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const editedUser = await edit(info);
    console.log(editedUser);
    setInfo(editedUser);
  };

  return (
    <main className="editProfile" style={{ marginTop: topMargin }}>
      <SimpleHeader title="Editar información" />
      <img
        src={info.profileImg}
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
          value={info.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={info.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="neighbourhood">Escoge tu distrito:</label>
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
        <label>¿Qué categorias te interesan?</label>
        <article className="categoriesDiv">
          {categories.map(({ category, img }) => (
            <CategorySelector
              title={category}
              isActive={
                info.category !== undefined && info.category.includes(category)
                  ? true
                  : false
              }
              img={img}
              onClick={() => handleCategory(category)}
              key={category}
            />
          ))}
        </article>
        <input
          type="submit"
          value="Guardar cambios"
          className="enviar"
          disabled={!imageReady}
          onClick={handleSubmit}
        />
      </form>
    </main>
  );
};

export default EditProfile;
