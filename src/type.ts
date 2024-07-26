export type TetrominoShape = string[][];

export interface Tetromino {
  x: number;
  y: number;
  shape: TetrominoShape;
}

export type tetrominoesList = "I" | "O" | "T" | "L" | "L2" | "S" | "S2";

