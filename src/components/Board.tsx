import { useState } from "react";

import c from "./Board.module.css";
import { tetrominoes, randomTet, board_x, board_y } from "../utils/tetrominoes";

export default function Board() {
  const [board, setBoard] = useState<string[]>(Array(board_x* board_y).fill("."));
  const [tetromino, setTetromino] = useState();

  const newTetro = () => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      const random = randomTet();
      //   console.log(random);
      tetrominoes[random].map((row, i) =>
        row.map((col, j) => (newBoard[j + 4 + i * board_y] = col))
      );

      return newBoard;
    });
  };


  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "r") newTetro();
    if (event.key === "ArrowDown") console.log("move down");
    if (event.key === "ArrowUp") console.log("rotate");
    if (event.key === " ") console.log("bottom");
    if (event.key === "ArrowRight") console.log("move right");
    if (event.key === "ArrowLeft") console.log("move left");
  };

  return (
    <div className={c.board} tabIndex={0} onKeyDown={handleKeyDown}>
      {board.map((elm, i) => (
        <span className={`${c.square} ${c[elm]}`} key={elm + i}></span>
      ))}
    </div>
  );
}
