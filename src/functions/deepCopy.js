const deepCopy = (board) => {
  const newBoard = [];
  for (let row of board) {
    let newRow = [...row];
    newBoard.push(newRow);
  }
  return newBoard;
};

export default deepCopy;
