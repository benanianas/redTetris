export interface Tetromino {
  x: number;
  y: number;
  shape: string[][] | string[];
}

export type TetrominoShape = string[][] | string[];
