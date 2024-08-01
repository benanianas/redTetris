import { useState, useEffect, useCallback } from "react";

import c from "./Board.module.css";
import {
  tetrominoes,
  gameBoard,
  board_x,
  rotateShape,
  checkPosition,
  randomTet,
  stackTetromino,
} from "../utils/tetrominoes";
import { Tetromino, sideType } from "../type";

const Board: React.FC = () => {
  const trr = randomTet();
  // const trr = "I";
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
        const { isValid } = checkPosition(
          { ...prevTetromino, y: y + 1 }
        );
        if (isValid) return { ...prevTetromino, y: y + 1 };
        else{
          stackTetromino(prevTetromino.type);
          const randomT = randomTet()
          return {
            x: 4,
            y: 0,
            shape: tetrominoes[randomT],
            type: randomT,
          };
        }
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const bounceBack = (
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
      else if (event.key === "ArrowUp")
        return bounceBack(newTetromino, prevTetromino, side);
      return prevTetromino;
    });
  };

  const tetrominoesTypes = ["i", "o", "t", "l", "l2", "s", "s2"];
  gameBoard.forEach((elm, i, board) => {
    board[i] = tetrominoesTypes.includes(elm) ? elm : ".";
  });

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
