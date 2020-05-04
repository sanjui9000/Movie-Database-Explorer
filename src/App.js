import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.scss";

import Home from "./Components/Home/Home";
import MovieDetails from "./Components/MovieDetails/MovieDetails";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/:page?" component={Home} exact />
        <Route path="/movies/:movie" component={MovieDetails} exact />
      </Switch>
    </div>
  );
}

export default App;
