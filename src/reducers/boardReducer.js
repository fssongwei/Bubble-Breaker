import generateBoard from "../functions/generateBoard";
import { NEW_GAME, CLICK_BOARD, UNDO, CANCEL_SELECT } from "../actions/types";

const boardReducer = (state = generateBoard(), action) => {
  if (action.type === NEW_GAME) {
    return generateBoard();
  }

  if (
    action.type === CLICK_BOARD ||
    action.type === UNDO ||
    action.type === CANCEL_SELECT
  ) {
    return action.payload.board;
  }

  return state;
};

export default boardReducer;
