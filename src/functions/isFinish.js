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

const isFinish = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] !== 0 && canEliminate([i, j], board)) return false;
    }
  }
  return true;
};

export default isFinish;
