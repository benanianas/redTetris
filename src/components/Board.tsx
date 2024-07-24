import { useState } from "react";

import c from "./Board.module.css";
import {
  tetrominoes,
  board_x,
  board_y,
  rotateShape,
} from "../utils/tetrominoes";
import { Tetromino } from "../type";

const gameBoard: string[] = Array(board_x * board_y).fill(".");

export default function Board() {
  const [tetromino, setTetromino] = useState<Tetromino>({
    x: 0,
    y: 4,
    shape: tetrominoes["S"],
  });

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    let { shape, x, y } = tetromino;
    if (event.key === "ArrowDown") x++;
    if (event.key === "ArrowUp") shape = rotateShape(tetromino.shape);
    if (event.key === " ") console.log("bottom");
    if (event.key === "ArrowRight") y++;
    if (event.key === "ArrowLeft") y--;

    setTetromino((prevTetris) => {
      return { ...prevTetris, x, y, shape };
    });
  };

  // TODO: update this cause it's gonna overwrite everything!
  gameBoard.fill(".");

  tetromino?.shape.map((row, i) => {
    row.map((col, j) => {
      if (col != ".")
        gameBoard[j + tetromino.y + (i + tetromino.x) * board_y] = col;
    });
  });

  return (
    <div className={c.board} tabIndex={0} onKeyDown={handleKeyDown}>
      {gameBoard.map((elm, i) => (
        <span className={`${c.square} ${c[elm]}`} key={elm + i}></span>
      ))}
    </div>
  );
}
