export type TetrominoShape = string[][];

export interface Tetromino {
  x: number;
  y: number;
  shape: TetrominoShape;
}

