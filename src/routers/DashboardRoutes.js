import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { HomeScreen } from "../screens/HomeScreen";
import TaskScreen from "../screens/TaskScreen";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <Switch>
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/task" component={TaskScreen} />
          <Route exact path="/task/:idTask" component={TaskScreen} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};
