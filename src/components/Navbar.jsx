import React from "react";

const Navbar = ({ score, highScore }) => {
  return (
    <nav className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-green-400 drop-shadow-md">
          🐍 Snake Game
        </h1>

        {/* Score Panel */}
        <div className="flex items-center gap-6">
          <div className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 shadow-inner">
            <p className="text-xs text-gray-400">High Score</p>
            <p className="text-lg font-bold text-yellow-400">{highScore}</p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 shadow-inner">
            <p className="text-xs text-gray-400">Score</p>
            <p className="text-lg font-bold text-green-400">{score}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
