import {
  START_GAME,
  REVEAL_TILE,
  TOGGLE_FLAGGED_TILE
} from "../actions/constants";

import {
  DEFAULT_GAME_STATE,
  startGame,
  revealTile,
  flagTile
} from "../utils/minesweeper";

export default (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case START_GAME: {
      const { rows, cols, mines } = action;

      return startGame({ rows, cols, mines });
    }
    case REVEAL_TILE: {
      return revealTile(state, action.tileId);
    }
    case TOGGLE_FLAGGED_TILE: {
      return flagTile(state, action.tileId);
    }
    default:
      return state;
  }
};
