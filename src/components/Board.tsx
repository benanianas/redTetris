import { useState, useEffect } from "react";

import c from "./Board.module.css";
import {
  tetrominoes,
  board_x,
  board_y,
  rotateShape,
  checkIfPossible,
  randomTet,
} from "../utils/tetrominoes";
import { Tetromino } from "../type";

const gameBoard: string[] = Array(board_x * board_y).fill(".");

const Board: React.FC = () => {
  const [tetromino, setTetromino] = useState<Tetromino>({
    x: 4,
    y: 0,
    shape: tetrominoes[randomTet()],
  });
  const [allowRotation, setAllowRotation] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTetromino((prevTetromino) => {
        const { y } = prevTetromino;
        if (checkIfPossible({ ...prevTetromino, y: y + 1 }))
          return { ...prevTetromino, y: y + 1 };
        return prevTetromino;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    setTetromino((prevTetromino) => {
      let { x, y, shape } = prevTetromino;
      if (event.key === "ArrowDown") y++;
      else if (event.key === "ArrowUp") {
        if (allowRotation) {
          shape = rotateShape(prevTetromino.shape);

          setAllowRotation(false);
        }
      } else if (event.key === " ") console.log("bottom");
      else if (event.key === "ArrowRight") x++;
      else if (event.key === "ArrowLeft") x--;

      if (checkIfPossible({ x, y, shape })) return { x, y, shape };

      return prevTetromino;
    });
  };

  // TODO: update this cause it's gonna overwrite everything!
  gameBoard.fill(".");

  tetromino?.shape.map((row, i) => {
    row.map((col, j) => {
      if (col != ".")
        gameBoard[j + tetromino.x + (i + tetromino.y) * board_x] = col;
    });
  });

  return (
    <div
      className={c.board}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onKeyUp={() => setAllowRotation(true)}
    >
      {gameBoard.map((elm, i) => (
        <span className={`${c.square} ${c[elm]}`} key={elm + i}></span>
      ))}
    </div>
  );
};

export default Board;
