import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/Auth/AuthContext";
import EventProvider from "./context/Events/EventContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <EventProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </EventProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
