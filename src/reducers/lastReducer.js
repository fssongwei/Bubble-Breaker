import { NEW_GAME, CLICK_BOARD, UNDO } from "../actions/types";

const lastReducer = (state = null, action) => {
  if (action.type === NEW_GAME || action.type === UNDO) {
    return null;
  }

  if (action.type === CLICK_BOARD && action.payload.lastBoard) {
    return { board: action.payload.lastBoard, score: action.payload.lastScore };
  }
  return state;
};

export default lastReducer;
