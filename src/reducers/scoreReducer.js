import { NEW_GAME, CLICK_BOARD, UNDO } from "../actions/types";

const scoreReducer = (state = 0, action) => {
  if (action.type === NEW_GAME) {
    return 0;
  }

  if (action.type === CLICK_BOARD || action.type === UNDO) {
    return action.payload.score;
  }
  return state;
};

export default scoreReducer;
