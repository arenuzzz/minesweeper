import React, { Component } from "react";
import { connect } from "react-redux";

import GameStatItem from "./GameStatItem.jsx";

import { getGameStartTime, getEndGame } from "../selectors";

class GameTimer extends Component {
  componentDidMount() {
    this.timer = setInterval(() => this.forceUpdate(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { startTime, label } = this.props;
    const timeInSeconds = Math.round((Date.now() - startTime) / 1000);

    return <GameStatItem stat={timeInSeconds} label="Timer" />;
  }
}

function mapStateToProps(state) {
  return {
    startTime: getGameStartTime(state),
    isEndGame: getEndGame(state)
  };
}

export default connect(mapStateToProps)(GameTimer);
