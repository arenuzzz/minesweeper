import { createSelector } from "reselect";
import { fromJS, Map, List } from "immutable";

export const getGame = state => state.get("game");

export const getGameBoard = createSelector(getGame, game => game.get("board"));
export const getGameCols = createSelector(getGame, game => game.get("cols"));
export const getGameRows = createSelector(getGame, game => game.get("rows"));

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
