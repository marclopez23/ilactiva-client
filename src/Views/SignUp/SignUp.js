import React from "react";
import "./SignUp.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

const SignUp = () => {
  const { handleSignup } = useAuth();

  const signupHandler = async (user) => {
    try {
      const newUser = await handleSignup(user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main>
      <SignUpForm onSubmit={signupHandler} />
    </main>
  );
};

export default SignUp;
