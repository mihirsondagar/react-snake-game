import React, { useState } from "react";
import Board from "./components/Board";
import Navbar from "./components/Navbar";

const App = () => {
  const [score, setScore] = useState(0);

  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")),
  );

  return (
    <div className="flex flex-col gap-2 items-center p-2 bg-black h-screen overflow-hidden w-full text-white">
      <Navbar score={score} highScore={highScore} />
      <Board
        score={score}
        setScore={setScore}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
};

export default App;
