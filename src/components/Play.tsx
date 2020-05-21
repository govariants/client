import Board from "./Board";
import React from "react";
import { useParams } from "react-router-dom";

function Play() {
  const { id } = useParams();
  return (
    <>
      <h1 className="title">Your game {id}</h1>
      <Board rows={19} columns={19} coords={true} />
    </>
  );
}

export default Play;
