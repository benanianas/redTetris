import { TetrominoShape, Tetromino, tetrominoesType, sideType } from "../type";

export const board_x: number = 10;
export const board_y: number = 20;

export const gameBoard: string[] = Array(board_x * board_y).fill(".");

export const tetrominoes: Record<tetrominoesType, TetrominoShape> = {
  I: [
    [".", "I", ".", "."],
    [".", "I", ".", "."],
    [".", "I", ".", "."],
    [".", "I", ".", "."],
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

// gameBoard[199] = "ph";
// gameBoard[198] = "s";
// gameBoard[197] = "s";
// gameBoard[196] = "s";
// gameBoard[195] = "s";
// gameBoard[194] = "s";
// gameBoard[193] = "s";
// gameBoard[192] = "s";
// gameBoard[191] = "s";
// gameBoard[190] = "s";
// gameBoard[180] = "s";
// gameBoard[170] = "s";
// gameBoard[160] = "s";
// gameBoard[150] = "s";
// gameBoard[140] = "s";
// gameBoard[130] = "s";
// gameBoard[120] = "s";
// gameBoard[189] = "s";
// gameBoard[179] = "s";
// gameBoard[169] = "s";
// gameBoard[159] = "s";
// gameBoard[149] = "s";
// gameBoard[139] = "s";
// gameBoard[129] = "s";
export const randomTet = (): tetrominoesType => {
  const keys: tetrominoesType[] = ["I", "O", "T", "L", "L2", "S", "S2"];
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

export const checkPosition = (
  tetromino: Tetromino
): { isValid: boolean; side?: sideType } => {
  // TODO: Error here
  for (let i = 0; i < tetromino?.shape?.length; i++)
    for (let j = 0; j < tetromino.shape.length; j++)
      if (tetromino.shape[i][j] !== ".") {
        if (j + tetromino.x >= board_x)
          return { isValid: false, side: "right" };
        else if (j + tetromino.x < 0) return { isValid: false, side: "left" };
        else if (i + tetromino.y >= board_y)
          return { isValid: false, side: "bottom" };
        const cell = gameBoard[j + tetromino.x + (i + tetromino.y) * board_x];
        if (cell !== "." && cell !== tetromino.type && cell !== "ph") {
          let side: sideType = "bottom";
          if (j === 0) side = "left";
          if (
            j + 1 === tetromino.shape.length ||
            j + 2 === tetromino.shape.length
          )
            side = "right";
          if (i + 1 === tetromino.shape.length) side = "bottom";
          //TODO : what About TOP !!!! i don't think i need it but will see!

          return { isValid: false, side: side };
        }
      }

  return { isValid: true };
};

export const clearFullRow = () => {
  for (let i = 0; i < board_x * board_y; i += 10) {
    if (i === board_x * board_y) continue;
    let clear = true;
    for (let x = 0; x <= board_x - 1; x++) {
      if (gameBoard[x + i] === ".") {
        clear = false;
        break;
      }
    }
    if (clear) {
      gameBoard.splice(i, 10);
      gameBoard.unshift(...Array(10).fill("."));
    }
  }
};

export const stackTetromino = (tetrominoType: string) => {
  gameBoard.forEach((cell, i, board) => {
    if (cell === tetrominoType) board[i] = cell.toLocaleLowerCase();
  });
};

export const possiblePosition = (tetromino: Tetromino): number => {
  let res: number = 0;
  for (let y = tetromino.y; y < board_y; y++) {
    const { isValid } = checkPosition({ ...tetromino, y });
    if (isValid) res = y;
    else break;
  }
  return res;
};
