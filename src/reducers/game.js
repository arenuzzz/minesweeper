import { START_GAME } from "../actions/constants";

import { startGame, DEFAULT_GAME_STATE } from "../utils/minesweeper";

export default (state = DEFAULT_GAME_STATE, action) => {
  switch (action.type) {
    case START_GAME: {
      const { rows, cols, mines } = action;

      return startGame({ rows, cols, mines });
    }
    default:
      return state;
  }
};
