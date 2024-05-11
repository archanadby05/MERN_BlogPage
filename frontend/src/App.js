import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import DetailsPages from "./pages/details/DetailsPages";
import Create from "./components/create/Create";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/post/:id" component={DetailsPages} />
            <Route exact path="/create" component={Create} />
            {/* Redirect to /login by default */}
            <Redirect from="/" to="/login" />
          </Switch>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
