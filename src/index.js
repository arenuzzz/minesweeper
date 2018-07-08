import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { Router, Route, Redirect, browserHistory } from "react-router";

import Game from "./components/Game.jsx";
import StartPage from "./components/StartPage.jsx";
import GamePage from "./containers/GamePage.jsx";

import store from "./store";

import "normalize.css";
import "./assets/main.css";

const routes = (
  <Route component={Game}>
    <Redirect from="/" to="start" />
    <Route path="start" component={StartPage} />
    <Route path="game" component={GamePage} />
  </Route>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById("root")
);
