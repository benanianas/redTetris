import { useState, useEffect } from "react";

import c from "./Board.module.css";
import {
  tetrominoes,
  gameBoard,
  board_x,
  board_y,
  rotateShape,
  checkPosition,
  stackTetromino,
  possiblePosition,
} from "../utils/tetrominoes";
import { Tetromino, sideType, tetrominoesType } from "../type";

const Board: React.FC<{ tetos: tetrominoesType[] }> = ({ tetos }) => {
  const [currentTet, setCurrentTet] = useState<number>(0);
  const [tetromino, setTetromino] = useState<Tetromino>({
    x: 4,
    y: 0,
    shape: tetrominoes[tetos[currentTet]],
    type: tetos[currentTet],
  });
  const [allowRotation, setAllowRotation] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTetromino((prevTetromino) => {
        const { y } = prevTetromino;
        const { isValid, side } = checkPosition({ ...prevTetromino, y: y + 1 });
        if (isValid) return { ...prevTetromino, y: y + 1 };
        else if (side === "bottom" && prevTetromino.y === 0) {
          // TODO: Game Over Logic here!
          console.log("gameOver");
          clearInterval(interval);
          return prevTetromino;
        } else {
          stackTetromino(prevTetromino.type);
          setCurrentTet((prevI) => prevI + 1);
          return {
            x: 4,
            y: 0,
            shape: tetrominoes[tetos[currentTet + 1]],
            type: tetos[currentTet + 1],
          };
        }
      });
    }, 800);
    return () => clearInterval(interval);
  }, [currentTet, tetos]);

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
      if (event.key === " ")
        return { ...prevTetromino, y: possiblePosition(tetromino) };
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

  // clear Board from last tetriminos and Placeholders
  gameBoard.forEach((elm, i, board) => {
    board[i] = (elm === tetromino.type || elm === "ph") ? "." : elm;
  });

  // Put PlaceHolders in board
  const y = possiblePosition(tetromino);
  tetromino.shape.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell != ".") gameBoard[(y + i) * board_x + j + tetromino.x] = "ph";
    });
  });

  // Put Tetriminos in the board
  tetromino.shape.map((row, i) => {
    row.map((cell, j) => {
      if (cell != ".")
        gameBoard[j + tetromino.x + (i + tetromino.y) * board_x] = cell;
    });
  });

  return (
    <>
      <div
        className={c.board}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={() => setAllowRotation(true)}
      >
        {gameBoard.map((elm, i) => (
          <span className={`${c.square} ${c[elm]}`} key={i}></span>
        ))}
      </div>
    </>
  );
};

export default Board;
