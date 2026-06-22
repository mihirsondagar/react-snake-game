import React from "react";
import Board from "./components/Board";

const App = () => {
  return (
    <div className="flex flex-col gap-2 items-center p-2 bg-black h-screen overflow-hidden w-full text-white">
      <h1 className="text-xl font-bold">Snake Game</h1>
      <h3 className="text-lg font-semibold">Score: 0</h3>

      <Board />
    </div>
  );
};

export default App;
