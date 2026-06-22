import React, { useEffect, useRef, useState } from "react";

const blockSize = 30;

const Board = () => {
  const boardRef = useRef(null);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const [snake, setSnake] = useState([{ row: 1, col: 3 }]);

  useEffect(() => {
    const updateDimensions = () => {
      const calcRows = Math.floor(boardRef.current.clientHeight / blockSize);
      const calcCols = Math.floor(boardRef.current.clientWidth / blockSize);

      setRows(calcRows);
      setCols(calcCols);
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    observer.observe(boardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  let cells = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let isSnake = snake.some(
        (segment) => segment.row === i && segment.col === j,
      );

      let elem = (
        <div
          key={`${i}-${j}`}
          style={{
            backgroundColor: isSnake ? "limegreen" : "transparent",
            border: "1px solid #333333",
            width: `${blockSize}px`,
            height: `${blockSize}px`,
          }}
        ></div>
      );

      cells.push(elem);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnake((prev) => {
        let head = { row: prev[0].row, col: prev[0].col + 1 };
        let newSnake = [head, ...prev];
        newSnake.pop();
        return newSnake;
      });
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      ref={boardRef}
      style={{
        border: "1px solid #333333",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${blockSize}px)`,
      }}
      className="w-full grow"
    >
      {cells}
    </div>
  );
};

export default Board;
