import { fromJS, Map, List } from "immutable";

export const DEFAULT_GAME_STATE = fromJS({
  board: [],
  cols: 4,
  rows: 6,
  mines: 10,
  moves: 0
});

export function startGame(params) {
  const game = fromJS({
    cols: params.cols,
    rows: params.rows,
    mines: params.mines,
    board: generateBoard(params),
    moves: 0,
    startedAt: Date.now()
  });
  console.log(addMineCounts(game));
  return addMineCounts(game);
}

export function revealTile(game, tileId) {
  const updatedGame = game
    .set("moves", game.get("moves") + 1)
    .setIn(["board", tileId, "isRevealed"], true);

  return updatedGame.getIn(["board", tileId, "isMine"])
    ? revealAllMines(updatedGame)
    : revealAdjacentSelfTiles(updatedGame, tileId);
}

export function revealAdjacentSelfTiles(game, tileId) {
  if (game.getIn(["board", tileId, "isMine"])) return game;
  if (game.getIn(["board", tileId, "mineCount"]) === 0) {
    const adjacentTileIds = getAdjacentTileIds(game, tileId);

    return adjacentTileIds.reduce((newGame, id) => {
      const isTileRevealed = game.getIn(["board", id, "isRevealed"]);

      return isTileRevealed ? newGame : revealAdjacentSelfTiles(newGame, id);
    }, setTileRevealed(game, tileId));
  }
  return setTileRevealed(game, tileId);
}

export function setTileRevealed(game, tileId) {
  return game.setIn(["board", tileId, "isRevealed"], true);
}

export function revealAllMines(game) {
  const newBoard = game
    .get("board")
    .map(tile => (tile.get("isMine") ? tile.set("isRevealed", true) : tile));
  return game.set("board", newBoard);
}

export function flagTile(game, tileId) {
  const isFlagged = ["board", tileId, "isFlagged"];

  return game.setIn(isFlagged, !game.getIn(isFlagged));
}

function addMineCounts(game) {
  const board = game
    .get("board")
    .map(tile => tile.set("mineCount", getMineCount(game, tile.get("id"))));

  return game.set("board", board);
}

function getAdjacentTileIds(game, tileId) {
  return directions
    .map(direction => direction(game, tileId))
    .filter(id => id !== null)
    .toList();
}

function getAdjacentTiles(game, tileId) {
  return getAdjacentTileIds(game, tileId).map(id => game.getIn(["board", id]));
}

function getMineCount(game, tileId) {
  return getAdjacentTiles(game, tileId).filter(tile => tile.get("isMine")).size;
}

const directions = new Map({
  N: (game, tileId) => getTileId(game, tileId - game.get("cols")),
  NW: (game, tileId) =>
    isTileOnEdge.W(game, tileId)
      ? null
      : getTileId(game, tileId - game.get("cols") - 1),
  NE: (game, tileId) =>
    isTileOnEdge.E(game, tileId)
      ? null
      : getTileId(game, tileId - game.get("cols") + 1),
  E: (game, tileId) =>
    isTileOnEdge.E(game, tileId) ? null : getTileId(game, tileId + 1),
  SE: (game, tileId) =>
    isTileOnEdge.E(game, tileId)
      ? null
      : getTileId(game, tileId + game.get("cols") + 1),
  S: (game, tileId) => getTileId(game, tileId + game.get("cols")),
  SW: (game, tileId) =>
    isTileOnEdge.W(game, tileId)
      ? null
      : getTileId(game, tileId + game.get("cols") - 1),
  W: (game, tileId) =>
    isTileOnEdge.W(game, tileId) ? null : getTileId(game, tileId - 1)
});

function getTileId(game, tileId) {
  if (tileId < 0) return null;
  if (tileId > game.get("cols") * game.get("rows") - 1) return null;
  return tileId;
}

const isTileOnEdge = {
  W: (game, tileId) => tileId % game.get("cols") === 0,
  E: (game, tileId) => tileId % game.get("cols") === game.get("cols") - 1
};

function generateBoard({ cols, rows, mines }) {
  const cell = Map({ isRevealed: false, isFlagged: false });

  const safeCells = repeat(cols * rows - mines, cell);
  const mineCells = repeat(mines, cell.set("isMine", true));

  return safeCells
    .concat(mineCells)
    .sort(() => Math.random() - 0.5)
    .map((cell, id) => cell.set("id", id));
}

function repeat(n, value) {
  const array = [];
  while (n--) {
    array.push(value);
  }
  return new List(array);
}
