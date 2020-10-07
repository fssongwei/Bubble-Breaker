import React from "react";
import Board from "./Board";
import Score from "./Score";
import { use100vh } from "react-div-100vh";

import { connect } from "react-redux";
import { cancelSelect } from "../actions";

const App = ({ board, cancelSelect }) => {
  const height = use100vh();
  return (
    <div onClick={() => cancelSelect(board)}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          height: height,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Score />
        <Board />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { board: state.board };
};

export default connect(mapStateToProps, { cancelSelect })(App);
