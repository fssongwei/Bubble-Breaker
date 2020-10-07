import { combineReducers } from "redux";
import boardReducer from "./boardReducer";
import scoreReducer from "./scoreReducer";
import lastReducer from "./lastReducer";

export default combineReducers({
  board: boardReducer,
  score: scoreReducer,
  last: lastReducer,
});
