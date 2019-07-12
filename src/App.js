import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import ReportState from "./context/report/ReportState";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <ReportState>
        <Navbar />
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </ReportState>
    </AuthState>
  );
};

export default App;
