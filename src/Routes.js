import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Dashboard from "./core/Dashboard";

const Routes = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
);

export default Routes;
