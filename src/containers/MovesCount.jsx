import React from "react";
import { connect } from "react-redux";

import GameStatItem from "./GameStatItem.jsx";

import { getGameMovesCount } from "../selectors";

function mapStateToProps(state) {
  return {
    stat: getGameMovesCount(state),
    label: "Moves"
  };
}

export default connect(mapStateToProps)(GameStatItem);
