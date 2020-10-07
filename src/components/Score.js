import React from "react";
import { connect } from "react-redux";

const Score = ({ score }) => {
  return (
    <div
      className="p-4"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>Your Score</h3>
      <h2>{score}</h2>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { score: state.score };
};

export default connect(mapStateToProps, null)(Score);
