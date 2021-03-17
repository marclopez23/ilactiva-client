import React, { useState } from "react";
import "./SignUp.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";
import SignUpCommerce from "../../components/Forms/SignUpCommerce/SignUpCommerce";
import "./SignUp.scss";
import vecinoSign from "../../assets/vecinoSign.svg";
import comercioSign from "../../assets/comercioSign.svg";

const SignUp = () => {
  const { handleSignup } = useAuth();
  const [isCommerce, setCommerce] = useState();
  const [showForm, setForm] = useState(false);
  console.log(isCommerce);
  const handleUserType = (type) => {
    const isNeighbour =
      type === "vecino" ? setCommerce(true) : setCommerce(false);
    setForm(true);
  };

  const signupHandler = async (user) => {
    try {
      const newUser = await handleSignup(user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main>
      {showForm ? (
        !isCommerce ? (
          <SignUpCommerce onSubmit={signupHandler} />
        ) : (
          <SignUpForm onSubmit={signupHandler} />
        )
      ) : (
        <section className="selectType">
          <h1 className="headline">Eres un ...</h1>
          <article
            className="userTypeCard vecino"
            onClick={() => handleUserType("vecino")}
          >
            <h3 className="title">Vecino/a</h3>
            <p className="body2">Quiero apuntarme y crear nuevas atividades.</p>
            <img src={vecinoSign} alt="vecinos" />
          </article>
          <article
            className="userTypeCard comercio"
            onClick={() => handleUserType("comercio")}
          >
            <h3 className="title">Comercio</h3>
            <p className="body2">
              Quiero ganar visiblidad y crear eventos para mis vecinos.
            </p>
            <img src={comercioSign} alt="comercios" />
          </article>
        </section>
      )}
    </main>
  );
};

export default SignUp;
