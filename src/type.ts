export type TetrominoShape = string[][];

export interface Tetromino {
  x: number;
  y: number;
  shape: TetrominoShape;
  type: tetrominoesType;
}

export type tetrominoesType = "I" | "O" | "T" | "L" | "L2" | "S" | "S2";

export type sideType = "right" | "left" | "bottom";
