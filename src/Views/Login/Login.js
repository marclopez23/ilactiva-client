import React from "react";
import "./Login.scss";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import loginImg from "../../assets/imagen-login.svg";
import logo from "../../assets/logo.svg";

const Login = () => {
  const { handleLogin } = useAuth();
  const loginHandler = async (user) => {
    try {
      const logUser = await handleLogin(user);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="login">
      <img src={logo} alt="logo" className="logo" />
      <img src={loginImg} alt="login illustration" className="illustration" />
      <article>
        <LoginForm onSubmit={loginHandler} />
      </article>
    </main>
  );
};

export default Login;
