import React from "react";

const BoardCell = ({ isSnake, isFood, blockSize }) => {
  return (
    <div
      style={{
        borderRadius: isSnake || isFood ? "50%" : "0",
        backgroundColor: isSnake ? "limegreen" : isFood ? "red" : "transparent",
        height: `${blockSize}px`,
        width: `${blockSize}px`,
        border: "1px solid #333",
      }}
    />
  );
};

export default BoardCell;
