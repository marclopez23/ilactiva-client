import React from "react";
import { login, logout, signup } from "../../service/auth.service";
import {
  getLocalUser,
  saveUser,
  removeUser,
  defaultUser,
} from "./AuthContext.utils";

export const AuthContext = React.createContext({});

const initialState = {
  user: getLocalUser(),
};

function AuthProvider({ children }) {
  const [state, setUser] = React.useState(initialState);

  const handleLogin = React.useCallback(async (user) => {
    try {
      const { data: loggedUser } = await login(user);
      saveUser(loggedUser);

      setUser({ user: { ...loggedUser, isLogged: true } });
    } catch (e) {
    
    }
  }, []);

  const handleSignup = React.useCallback(async (user) => {
    try {
      const { data: loggedUser } = await signup(user);
      saveUser(loggedUser);
      setUser({ user: { ...loggedUser, isLogged: true } });
    } catch (e) {
      
    }
  }, []);

  const handleLogout = React.useCallback(async () => {
    try {
      await logout();
      removeUser();
      setUser({ user: defaultUser() });
    } catch (e) {
      
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        handleLogin,
        handleLogout,
        handleSignup,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
