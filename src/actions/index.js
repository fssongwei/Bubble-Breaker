import { NEW_GAME, CLICK_BOARD, UNDO, CANCEL_SELECT } from "./types";
import deepCopy from "../functions/deepCopy";
import { Howl } from "howler";
import eliminate from "../sounds/eliminate.wav";
import bigEliminate from "../sounds/bigEliminate.wav";

export const createNewGame = () => {
  return { type: NEW_GAME };
};

export const undo = (board, score) => {
  let newBoard = deepCopy(board);
  flipBoard(newBoard);
  return { type: UNDO, payload: { board: newBoard, score } };
};

export const cancelSelect = (board) => {
  let newBoard = deepCopy(board);
  flipBoard(newBoard);
  return { type: CANCEL_SELECT, payload: { board: newBoard } };
};

// helper: flip the board from negative to positive (negative value means the ball is clicked but not eliminate)
const flipBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = Math.abs(board[i][j]);
    }
  }
};

export const clickBall = (position, board, score) => {
  let [i, j] = position;
  if (!canEliminate(position, board))
    return { type: CLICK_BOARD, payload: { board: board, score: score } };
  let newBoard = deepCopy(board);
  if (newBoard[i][j] >= 0) {
    flipBoard(newBoard);
  }

  let visited = new Set();
  let nBall = dfsHelper(i, j, newBoard, visited, newBoard[i][j]);
  let lastBoard = nBall > 0 ? board : null;
  let lastScore = score;
  score += nBall * (nBall + 1);
  reorganizeBalls(newBoard);

  if (nBall >= 8) new Howl({ src: bigEliminate }).play();
  else if (nBall > 0) new Howl({ src: eliminate }).play();

  return {
    type: CLICK_BOARD,
    payload: { board: newBoard, score, lastBoard, lastScore },
  };
};

// helper function: see if the ball can be eliminate (must be at least two balls link together)
export const canEliminate = (position, board) => {
  let [i, j] = position;
  if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) return false;
  if (i - 1 >= 0 && board[i - 1][j] === board[i][j]) return true;
  if (j - 1 >= 0 && board[i][j - 1] === board[i][j]) return true;
  if (i + 1 < board.length && board[i + 1][j] === board[i][j]) return true;
  if (j + 1 < board[0].length && board[i][j + 1] === board[i][j]) return true;
  return false;
};

// helper function: do the dfs algorithm to find all balls link together with same color
const dfsHelper = (i, j, board, visited, targetColor) => {
  if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) return 0;
  if (visited.has(i * 100 + j)) return 0;
  visited.add(i * 100 + j);
  if (board[i][j] === targetColor)
    board[i][j] = targetColor > 0 ? -targetColor : 0;
  else return 0;
  let nBall = 1;
  nBall += dfsHelper(i - 1, j, board, visited, targetColor);
  nBall += dfsHelper(i + 1, j, board, visited, targetColor);
  nBall += dfsHelper(i, j - 1, board, visited, targetColor);
  nBall += dfsHelper(i, j + 1, board, visited, targetColor);
  if (targetColor > 0) return 0;
  return nBall;
};

// helper function: reorganize the board after eliminate the ball (push all ball to the bottom and right)
const reorganizeBalls = (board) => {
  for (let j = 0; j < board[0].length; j++) {
    let col = [];
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][j] !== 0) col.push(board[i][j]);
      board[i][j] = 0;
    }
    let i = board.length - 1;
    for (let ball of col) board[i--][j] = ball;
  }

  for (let j = board[0].length - 1; j > 0; j--) {
    if (isEmptyCol(j, board)) {
      let newJ = j - 1;
      for (; newJ > 0; newJ--) {
        if (!isEmptyCol(newJ, board)) break;
      }

      if (newJ >= 0) {
        for (let i = 0; i < board.length; i++) {
          board[i][j] = board[i][newJ];
          board[i][newJ] = 0;
        }
      }
    }
  }
};

// helper function: see if a column of board is empty
const isEmptyCol = (j, board) => {
  let emptyCol = true;
  for (let i = 0; i < board.length; i++) {
    if (board[i][j] !== 0) {
      emptyCol = false;
      break;
    }
  }
  return emptyCol;
};
