import { createSelector } from "reselect";
import { fromJS, Map, List } from "immutable";

export const getGame = state => state.get("game");

export const getGameBoard = createSelector(getGame, game => game.get("board"));
export const getGameCols = createSelector(getGame, game => game.get("cols"));
export const getGameRows = createSelector(getGame, game => game.get("rows"));
export const getGameMovesCount = createSelector(getGame, game =>
  game.get("moves")
);
export const getGameMineCount = createSelector(getGame, game =>
  game.get("mines")
);
export const getMinesLeftCount = createSelector(
  getGameMineCount,
  getGameBoard,
  (mines, board) => {
    return mines - board.filter(tile => tile.get("isFlagged")).size;
  }
);
export const getGameStartTime = createSelector(getGame, game =>
  game.get("startedAt")
);
export const getGameBoardView = createSelector(
  getGameBoard,
  getGameCols,
  (board, cols) => {
    return board.reduce((rows, tile) => {
      const rowIdx = Math.floor(tile.get("id") / cols);
      const row = rows.get(rowIdx);

      return row
        ? rows.set(rowIdx, row.push(tile))
        : rows.push(new List([tile]));
    }, new List());
  }
);
const GAME_STATUS = {
  WINNER: "WINNER",
  LOOSER: "LOOSER",
  PLAYING: "PLAYING"
};
export const getGameStatus = createSelector(getGameBoard, board => {
  const isWinner = board.reduce(
    (status, tile) =>
      tile.get("isMine") ? status : status && tile.get("isRevealed"),
    true
  );

  if (isWinner) {
    return "WINNER";
  }

  const isLooser = board.reduce(
    (status, tile) =>
      tile.get("isMine") ? status && tile.get("isRevealed") : status,
    true
  );

  if (isLooser) {
    return "LOOSER";
  }

  return "PLAYING";
});

export const getEndGame = createSelector(getGameStatus, status => {
  return status === GAME_STATUS.WINNER || status === GAME_STATUS.LOOSER;
});
