import React, { useState } from "react";
import "./Login.scss";
import { Route, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth/AuthContext.utils";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import loginImg from "../../assets/imagen-login.svg";
import logo from "../../assets/logo.svg";

const Login = () => {
  const { handleLogin } = useAuth();
  const [error, setError] = useState();
  const loginHandler = async (user) => {
    try {
      await handleLogin(user);
    } catch (e) {
      setError(e.response.data.message);
    }
  };
  return (
    <main className="login">
      <img src={logo} alt="logo" className="logo" />
      <img src={loginImg} alt="login illustration" className="illustration" />
      <article>
        <LoginForm onSubmit={loginHandler} />
        {error && <p className="error">{error}</p>}
      </article>
      <Route>
        <Link to="/registrarme" className="enlace link">
          No tienes cuenta? Registrate
        </Link>
      </Route>
    </main>
  );
};

export default Login;
