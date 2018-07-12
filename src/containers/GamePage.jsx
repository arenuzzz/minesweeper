import React, { Component } from "react";
import { connect } from "react-redux";

import GameBoard from "./GameBoard.jsx";
import GameStatus from "./GameStatus.jsx";
import Footer from "../components/Footer.jsx";
import * as actions from "../actions";
import { getEndGame } from "../selectors";

class GamePage extends Component {
  componentDidMount() {
    this.props.startGame();
  }
  render() {
    return (
      <div>
        <GameStatus />
        <GameBoard />
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { isEndGame: getEndGame(state) };
}
export default connect(
  mapStateToProps,
  actions
)(GamePage);
