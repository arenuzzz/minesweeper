import React, { Component } from "react";
import { connect } from "react-redux";
import { List } from "immutable";

import Board from "../components/Board.jsx";

import * as actions from "../actions";
import { getGameBoardView, getEndGame } from "../selectors";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.playing = true;
  }
  /*
  У меня не получился рестарт игры через state, ибо изменять state по ссылке -
  нехорошо. Найду  способ получше, исправлю!!!!!!!!!
  */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEndGame) {
      setTimeout(() => {
        this.playing = false;
      }, 0);
    }

    if (!nextProps.isEndGame && !this.playing) {
      this.playing = true;
    }
  }

  shouldComponentUpdate() {
    return this.playing;
  }

  render() {
    const { board, revealTile, toggleFlaggedTile, isEndGame } = this.props;
    return (
      <Board
        rows={board}
        onReveal={revealTile}
        onToggleFlagged={toggleFlaggedTile}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    board: getGameBoardView(state),
    isEndGame: getEndGame(state)
  };
}
export default connect(
  mapStateToProps,
  actions
)(GameBoard);
