import React from "react";

const GameOver = ({ score, restartGame }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center shadow-2xl w-[300px]">
        <h1 className="text-3xl font-extrabold text-red-500 mb-3">Game Over</h1>

        <p className="text-gray-300 mb-2">Your Score</p>
        <p className="text-4xl font-bold text-green-400 mb-6">{score}</p>

        <button
          onClick={restartGame}
          className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOver;
