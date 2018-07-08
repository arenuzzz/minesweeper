import React, { Component } from "react";
import { connect } from "react-redux";

import GameBoard from "./GameBoard.jsx";

import * as actions from "../actions";

class GamePage extends Component {
  componentDidMount() {
    this.props.startGame();
  }
  render() {
    return <GameBoard />;
  }
}

export default connect(
  null,
  actions
)(GamePage);
