import { TetrominoShape, Tetromino, tetrominoesType, sideType } from "../type";

export const board_x: number = 10;
export const board_y: number = 20;

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

export const gameBoard: string[] = Array(board_x * board_y).fill(".");
gameBoard[199] = "i";
gameBoard[198] = "i";
gameBoard[197] = "i";
gameBoard[196] = "i";
gameBoard[195] = "i";
gameBoard[194] = "i";
gameBoard[193] = "i";
gameBoard[192] = "i";
gameBoard[191] = "i";
gameBoard[190] = "i";
gameBoard[189] = "i";
gameBoard[179] = "i";
gameBoard[169] = "i";
gameBoard[159] = "i";
gameBoard[149] = "i";
gameBoard[139] = "i";
gameBoard[129] = "i";
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
  tetromino: Tetromino,
  currentTetromino: Tetromino
): { isValid: boolean; side?: sideType } => {
  for (let i = 0; i < tetromino.shape.length; i++)
    for (let j = 0; j < tetromino.shape[i].length; j++)
      if (tetromino.shape[i][j] === tetromino.type) {
        if (j + tetromino.x >= board_x)
          return { isValid: false, side: "right" };
        else if (j + tetromino.x < 0) return { isValid: false, side: "left" };
        else if (i + tetromino.y >= board_y)
          return { isValid: false, side: "bottom" };
        else if (
          gameBoard[j + tetromino.x + (i + tetromino.y) * board_x] !== "."
          && gameBoard[j + tetromino.x + (i + tetromino.y) * board_x] !== tetromino.type
        ) {
          let side: sideType = "bottom";
          if(tetromino.y > currentTetromino.y){
            console.log("bottom")
            side = "bottom"
          }
          else if(tetromino.x > currentTetromino.x){
            console.log("right")
            side = "right"
          }
          else if(tetromino.x < currentTetromino.x){
            console.log("left")
            side = "left"
          }
            console.log("berra", j + tetromino.x , (i + tetromino.y))
  

          return { isValid: false, side };
        }
      }

  return { isValid: true };
};
