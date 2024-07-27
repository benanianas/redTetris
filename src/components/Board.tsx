import { useState, useEffect } from "react";

import c from "./Board.module.css";
import {
  tetrominoes,
  board_x,
  board_y,
  rotateShape,
  checkPosition,
  randomTet,
} from "../utils/tetrominoes";
import { Tetromino, sideType } from "../type";

const gameBoard: string[] = Array(board_x * board_y).fill(".");

const Board: React.FC = () => {
  const trr = randomTet();
  const [tetromino, setTetromino] = useState<Tetromino>({
    x: 4,
    y: 0,
    shape: tetrominoes[trr],
    type: trr,
  });
  const [allowRotation, setAllowRotation] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTetromino((prevTetromino) => {
        const { y } = prevTetromino;
        if (checkPosition({ ...prevTetromino, y: y + 1 }).isValid)
          return { ...prevTetromino, y: y + 1 };
        return prevTetromino;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const bounce = (
    tetromino: Tetromino,
    prevTetromino: Tetromino,
    side: sideType | undefined
  ): Tetromino => {
    let { x, y } = tetromino;

    side === "right" ? x-- : side === "left" ? x++ : y--;

    const { isValid, side: side2 } = checkPosition({ ...tetromino, x, y });
    if (isValid) return { ...tetromino, x, y };
    else if (tetromino.type === "I") {
      side2 === "right" ? x-- : side2 === "left" ? x++ : y--;
      if (checkPosition({ ...tetromino, x, y }).isValid)
        return { ...tetromino, x, y };
    }

    return prevTetromino;
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    setTetromino((prevTetromino) => {
      const { x, y } = prevTetromino;
      let { shape } = prevTetromino;

      let offsetX = 0,
        offsetY = 0;
      if (event.key === " ") console.log("bottom");
      else if (event.key === "ArrowRight") offsetX++;
      else if (event.key === "ArrowLeft") offsetX--;
      else if (event.key === "ArrowDown") offsetY++;
      else if (event.key === "ArrowUp") {
        if (allowRotation) {
          shape = rotateShape(prevTetromino.shape);
          setAllowRotation(false);
        }
      }
      const newTetromino = {
        ...prevTetromino,
        x: x + offsetX,
        y: y + offsetY,
        shape,
      };
      const { isValid, side } = checkPosition(newTetromino);
      if (isValid) return newTetromino;
      else return bounce(newTetromino, prevTetromino, side);
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
