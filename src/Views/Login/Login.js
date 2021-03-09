import React from "react";
import "./Login.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";

const Login = () => {
  const { handleLogin } = useAuth();
  const loginHandler = async (user) => {
    try {
      const logUser = await handleLogin(user);
      console.log("logged");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main>
      <LoginForm onSubmit={loginHandler} />
    </main>
  );
};

export default Login;
