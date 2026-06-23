import React from "react";

const BoardCell = ({ isSnake, isFood, isHead, blockSize }) => {
  if (isFood) {
    return (
      <div
        style={{
          width: blockSize,
          height: blockSize,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #333",
          fontSize: blockSize * 0.8,
        }}
      >
        🍎
      </div>
    );
  }

  if (isHead) {
    return (
      <div
        style={{
          width: blockSize,
          height: blockSize,
          backgroundColor: "#00ff66",
          borderRadius: "50%",
          border: "1px solid #333",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            background: "black",
            borderRadius: "50%",
            top: "8px",
            left: "7px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            background: "black",
            borderRadius: "50%",
            top: "8px",
            right: "7px",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: isSnake ? "10px" : 0,
        backgroundColor: isSnake ? "limegreen" : "transparent",
        height: `${blockSize}px`,
        width: `${blockSize}px`,
        border: "1px solid #333",
      }}
    />
  );
};

export default BoardCell;
