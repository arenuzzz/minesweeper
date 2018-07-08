import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "immutable";

import Board from "../components/Board.jsx";

import * as actions from "../actions";
import { getGameBoardView } from "../selectors";

class GameBoard extends Component {
  render() {
    const { board } = this.props;

    return <Board rows={board} />;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    board: getGameBoardView(state)
  };
}
export default connect(
  mapStateToProps,
  actions
)(GameBoard);
