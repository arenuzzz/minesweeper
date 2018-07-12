import React, { Component } from "react";
import { connect } from "react-redux";
import { getGameStatus, getEndGame } from "../selectors";

import { startGame } from "../actions";

import EmojiStatus from "../components/EmojiStatus.jsx";

const statusEmojis = {
  LOOSER: "dizzy-face",
  WINNER: "sunglasses",
  PLAYING: "smiley"
};

class GameStatus extends Component {
  handleClick = () => {
    const { isEndGame, startGame } = this.props;
    isEndGame && startGame();
  };

  render() {
    return (
      <EmojiStatus
        status={this.props.gameStatus}
        mapper={statusEmojis}
        restartGame={this.handleClick}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    gameStatus: getGameStatus(state),
    isEndGame: getEndGame(state)
  };
}
export default connect(
  mapStateToProps,
  { startGame }
)(GameStatus);
