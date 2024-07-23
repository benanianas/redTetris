import { useState } from "react";

import c from "./Board.module.css";
import { tetrominoes, board_x, board_y } from "../utils/tetrominoes";
import { Tetromino } from "../type";

const gameBoard: string[] = Array(board_x * board_y).fill(".");

export default function Board() {
  const [tetromino, setTetromino] = useState<Tetromino | undefined>();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "r")
      setTetromino({
        x: 0,
        y: 4,
        shape: tetrominoes["O"],
      });
    if (event.key === "ArrowDown")
      setTetromino((prevTet) => {
        if (prevTet) return { ...prevTet, x: prevTet.x + 1 };
      });
    if (event.key === "ArrowUp") console.log("rotate");
    if (event.key === " ") console.log("bottom");
    if (event.key === "ArrowRight") console.log("move right");
    if (event.key === "ArrowLeft") console.log("move left");
  };

  // TODO: update this cause it's gonna overwrite everything!
  gameBoard.fill(".");

  tetromino?.shape.map((row, i) => {
    if (Array.isArray(row))
      row.map(
        (col, j) =>
          (gameBoard[j + tetromino.y + (i + tetromino.x) * board_y] = col)
      );
    else gameBoard[i + tetromino.y + tetromino.x * board_y] = row;
  });

  return (
    <div className={c.board} tabIndex={0} onKeyDown={handleKeyDown}>
      {gameBoard.map((elm, i) => (
        <span className={`${c.square} ${c[elm]}`} key={elm + i}></span>
      ))}
    </div>
  );
}
