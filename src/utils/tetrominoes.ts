import { TetrominoShape, Tetromino } from "../type";

export const board_x: number = 10;
export const board_y: number = 20;

export const tetrominoes: Record<string, TetrominoShape> = {
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

export const randomTet = () => {
  return Object.keys(tetrominoes)[Math.floor(Math.random() * 4)];
};

export const rotateShape = (shape: TetrominoShape): TetrominoShape => {
  const m = shape.length;
  const n = shape[0].length;

  const newShape: TetrominoShape = Array.from({ length: n }, () =>
    Array(m).fill(null)
  );

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) newShape[n - 1 - j][i] = shape[i][j];

  return newShape;
};

export const checkIfPossible = (tetromino: Tetromino): boolean => {
  for (let i = 0; i < tetromino.shape.length; i++)
    for (let j = 0; j < tetromino.shape[i].length; j++)
      if (
        tetromino.shape[i][j] !== "." &&
        (j + tetromino.x >= board_x || j + tetromino.x < 0 || i + tetromino.y >= board_y)
      )
        return false;
  return true;
};
