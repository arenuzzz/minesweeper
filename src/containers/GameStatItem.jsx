import React, { Component } from "react";
import { connect } from "react-redux";

import StatItem from "../components/StatItem.jsx";
import { getEndGame } from "../selectors";

class GameStatItem extends Component {
  shouldComponentUpdate(nextProps) {
    return !nextProps.isPlaying;
  }

  render() {
    return <StatItem {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isPlaying: getEndGame(state)
  };
}

export default connect(mapStateToProps)(GameStatItem);
