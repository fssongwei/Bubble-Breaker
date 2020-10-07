import React, { useEffect } from "react";
import isFinish from "../functions/isFinish";

import Ball from "./Ball";
import { Howl } from "howler";
import finish from "../sounds/finish.mp3";

import { connect } from "react-redux";
import { clickBall, createNewGame, undo } from "../actions";
import "./Board.css";

const onBallClick = (event, position, board, score, clickBall) => {
  event.stopPropagation();
  let [i, j] = position;
  if (board[i][j] === 0) return;
  clickBall(position, board, score);
};

const Board = ({ board, score, last, createNewGame, clickBall, undo }) => {
  useEffect(() => {
    if (isFinish(board)) {
      new Howl({ src: finish }).play();
      alert("You win! Your score is: " + score);
      createNewGame();
    }
    // eslint-disable-next-line
  }, [board]);

  return (
    <div className="board">
      <div>
        {board.map((row, i) => {
          let ballRow = row.map((colorIndex, j) => {
            return (
              <Ball
                key={j}
                colorIndex={colorIndex}
                onBallClick={(event) =>
                  onBallClick(event, [i, j], board, score, clickBall)
                }
              />
            );
          });
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              key={i}
            >
              {ballRow}
            </div>
          );
        })}
      </div>

      <div className="p-4 buttonGroup">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.stopPropagation();
            createNewGame();
          }}
        >
          <i className="fas fa-dice"></i> New
        </button>

        {last && (
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              undo(last.board, last.score);
            }}
          >
            <i className="fas fa-undo-alt"></i> Reset
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { board: state.board, score: state.score, last: state.last };
};

export default connect(mapStateToProps, {
  createNewGame,
  clickBall,
  undo,
})(Board);
