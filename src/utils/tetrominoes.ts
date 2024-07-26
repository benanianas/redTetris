import { TetrominoShape, Tetromino, tetrominoesList } from "../type";

export const board_x: number = 10;
export const board_y: number = 20;


export const tetrominoes: Record<tetrominoesList, TetrominoShape> = {
  I: [
    [".", ".", ".", "."],
    ["I", "I", "I", "I"],
    [".", ".", ".", "."],
    [".", ".", ".", "."],
  ],
  O: [
    ["O", "O"],
    ["O", "O"],
  ],
  T: [
    [".", "T", "."],
    ["T", "T", "T"],
    [".", ".", "."],
  ],
  L: [
    [".", ".", "L"],
    ["L", "L", "L"],
    [".", ".", "."],
  ],
  L2: [
    ["L2", ".", "."],
    ["L2", "L2", "L2"],
    [".", ".", "."],
  ],
  S: [
    [".", "S", "S"],
    ["S", "S", "."],
    [".", ".", "."],
  ],
  S2: [
    ["S2", "S2", "."],
    [".", "S2", "S2"],
    [".", ".", "."],
  ],
};

export const randomTet = (): tetrominoesList => {
  const keys: tetrominoesList[] = ["I", "O", "T", "L", "L2", "S", "S2"];
  return keys[Math.floor(Math.random() * 7)];
};

export const rotateShape = (shape: TetrominoShape): TetrominoShape => {
  const n = shape.length;

  const newShape: TetrominoShape = Array.from({ length: n }, () =>
    Array(n).fill(null)
  );

  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) newShape[n - j - 1][i] = shape[i][j];

  return newShape;
};

export const checkIfPossible = (tetromino: Tetromino): boolean => {
  for (let i = 0; i < tetromino.shape.length; i++)
    for (let j = 0; j < tetromino.shape[i].length; j++)
      if (
        tetromino.shape[i][j] !== "." &&
        (j + tetromino.x >= board_x ||
          j + tetromino.x < 0 ||
          i + tetromino.y >= board_y)
      )
        return false;
  return true;
};