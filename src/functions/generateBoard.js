const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const generateBoard = () => {
  let board = [];
  for (let r = 0; r < 12; r++) {
    let row = [];
    for (let c = 0; c < 11; c++) {
      row.push(getRandomInt(5) + 1);
    }
    board.push(row);
  }
  return board;
};

export default generateBoard;
