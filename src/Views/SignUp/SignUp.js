import React, { useState } from "react";
import "./SignUp.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

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
          <p>Comercio</p>
        ) : (
          <SignUpForm onSubmit={signupHandler} />
        )
      ) : (
        <div>
          <h2 onClick={() => handleUserType("vecino")}>Vecino</h2>
          <h2 onClick={() => handleUserType("comercio")}>Comercio</h2>
        </div>
      )}
    </main>
  );
};

export default SignUp;
