import "./App.css";
import Board from "./components/Board";
import { tetrominoesType } from "./type";

function App() {
  const tetos: tetrominoesType[] = [
    "S",
    "L",
    "O",
    "T",
    "L2",
    "I",
    "S",
    "S2",
    "L",
    "I",
    "T",
    "O",
    "S2",
    "L2",
    "I",
    "T",
    "L",
    "S",
    "O",
    "L2",
    "S",
    "I",
    "S2",
    "O",
    "T",
    "L",
    "L2",
    "S",
    "I",
    "T",
    "O",
  ];

  return (
    <>
      <Board tetos={tetos}/>
    </>
  );
}

export default App;
