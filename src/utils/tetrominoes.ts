type TetrominoShape = string[][];

export const board_y:number = 10; 
export const board_x:number = 20; 

export const tetrominoes: Record<string, TetrominoShape> = {
  //   I: ["I", "I", "I", "I"],
  O: [
    ["O", "O"],
    ["O", "O"],
  ],
  T: [
    ["T", "T", "T"],
    [".", "T", "."],
  ],
  L: [
    ["L", ".", "."],
    ["L", ".", "."],
    ["L", "L", "."],
  ],
  S: [
    [".", "S", "S"],
    ["S", "S", "."],
  ],
};

export const randomTet = () => {
    return Object.keys(tetrominoes)[Math.floor(Math.random()*4)]
};
