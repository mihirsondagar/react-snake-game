import React from "react";
import {
  MoveUp,
  MoveDown,
  MoveRight,
  MoveLeft,
  Play,
  Space,
} from "lucide-react";

const Home = ({ highScore, startGame }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full text-white">
      <h1 className="text-7xl font-extrabold mb-4 tracking-wider text-green-400">
        🐍 SNAKE
      </h1>

      <p className="text-gray-400 mb-8 text-lg">
        Eat apples. Grow longer. Don't bite yourself.
      </p>

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-10 py-6 mb-8 shadow-lg">
        <h2 className="text-xl text-gray-300 mb-2">High Score</h2>
        <p className="text-4xl text-center font-bold text-yellow-400">
          {highScore}
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-8 w-[350px]">
        <h3 className="text-xl font-semibold mb-4 text-center">Controls</h3>

        <div className="grid grid-cols-2 gap-3 text-gray-300">
          <span className="flex gap-2">
            <MoveUp className="w-[22px] h-[22px] border rounded" />
            <MoveDown className="w-[22px] h-[22px] border rounded" />
            <MoveLeft className="w-[22px] h-[22px] border rounded" />
            <MoveRight className="w-[22px] h-[22px] border rounded" />
          </span>
          <span>Move</span>

          <span>Space / Esc</span>
          <span>Pause / Resume</span>
        </div>
      </div>

      <button
        onClick={startGame}
        className="active:scale-95 cursor-pointer px-10 py-4 bg-green-500 hover:bg-green-600 transition-all duration-200 rounded-xl text-xl font-bold shadow-lg"
      >
        <Play className="inline w-[28px] h-[28px] mb-1 mr-2" /> Start Game
      </button>
    </div>
  );
};

export default Home;
