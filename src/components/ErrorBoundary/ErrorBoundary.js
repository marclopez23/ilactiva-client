import React from "react";
import ErrorPage from "../../Views/ErrorPage/ErrorPage";
import Navbar from "../../components/Navbar/Navbar";
import Menu from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {}
  render() {
    if (this.state.hasError) {
      return (
        <>
          <Menu />
          <ErrorPage title="Parece que ha ocurrido un error" />
          <Navbar />
          <Footer />
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
