import React from "react";
import useSound from "use-sound";
import bigEliminate from "../sounds/bigEliminate.wav";
import eliminate from "../sounds/eliminate.wav";
import deepCopy from "../functions/deepCopy";

const Ball = ({ colorIndex, onBallClick }) => {
  const colors = ["transparent", "red", "green", "blue", "purple", "yellow"];

  return (
    <div
      onClick={(event) => {
        onBallClick(event);
      }}
      style={{
        outline: "none",
        border: "none",
        borderRadius: "50%",
        backgroundColor: colorIndex >= 0 ? colors[colorIndex] : "grey",
        padding: "4%",
        margin: "2px",
      }}
    ></div>
  );
};

export default Ball;
