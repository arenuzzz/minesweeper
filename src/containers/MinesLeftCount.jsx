import React from "react";
import { connect } from "react-redux";

import GameStatItem from "./GameStatItem.jsx";

import { getMinesLeftCount } from "../selectors";

function mapStateToProps(state) {
  return {
    stat: getMinesLeftCount(state),
    label: "Mines left"
  };
}

export default connect(mapStateToProps)(GameStatItem);
