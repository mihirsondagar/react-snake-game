import React from "react";
import { Pause, RotateCcw, Play } from "lucide-react";

const PausePage = ({ score, restartGame, resumeGame }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-2xl w-[400px]">
        <h1 className="text-3xl font-extrabold text-amber-50 mb-3">
          <Pause className="inline mb-2 mr-3" />
          Pause
        </h1>

        <p className="text-gray-300 mb-2">Your Score</p>
        <p className="text-4xl font-bold text-green-400 mb-6">{score}</p>

        <div className="flex gap-4 justify-center items-center">
          <button
            onClick={resumeGame}
            className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition"
          >
            <div className="flex gap-2 items-center justify-between">
              <Play />
              <span>Resume</span>
            </div>
          </button>
          <button
            onClick={restartGame}
            className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition"
          >
            <div className="flex gap-2 items-center justify-between">
              <RotateCcw />
              <span>Restart</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PausePage;
