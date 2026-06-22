import React, { use, useEffect, useRef, useState } from "react";

const blockSize = 30;

const Board = () => {
  const boardRef = useRef(null);

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const [snake, setSnake] = useState([{ row: 1, col: 3 }]);

  const directionRef = useRef("right");

  const [food, setFood] = useState(null);

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

      let isFood = food && food.row === i && food.col === j;

      let elem = (
        <div
          key={`${i}-${j}`}
          style={{
            backgroundColor: isSnake
              ? "limegreen"
              : isFood
                ? "red"
                : "transparent",
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
    if (rows === 0 || cols === 0 || !food) return;

    const intervalId = setInterval(() => {
      setSnake((prev) => {
        let head;

        let direction = directionRef.current;

        if (direction === "up") {
          head = { row: prev[0].row - 1, col: prev[0].col };
        } else if (direction === "down") {
          head = { row: prev[0].row + 1, col: prev[0].col };
        } else if (direction === "right") {
          head = { row: prev[0].row, col: prev[0].col + 1 };
        } else if (direction === "left") {
          head = { row: prev[0].row, col: prev[0].col - 1 };
        }

        let newSnake = [head, ...prev];

        if (head.row === food.row && head.col === food.col) {
          setFood(null);
          spawnFood(rows, cols, newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [rows, cols, food]);

  useEffect(() => {
    const handleKey = (dets) => {
      let direction = directionRef.current;

      if (direction === "right" || direction === "left") {
        if (dets.key === "ArrowUp") {
          directionRef.current = "up";
        } else if (dets.key === "ArrowDown") {
          directionRef.current = "down";
        }
      } else if (direction === "up" || direction === "down") {
        if (dets.key === "ArrowRight") {
          directionRef.current = "right";
        } else if (dets.key === "ArrowLeft") {
          directionRef.current = "left";
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [directionRef.current]);

  const spawnFood = (currRows, currCols, currSnake) => {
    let foodRow, foodCol;

    let isOnSnake = true;

    while (isOnSnake) {
      foodRow = Math.floor(Math.random() * currRows);
      foodCol = Math.floor(Math.random() * currCols);

      isOnSnake = currSnake.some((segment) => {
        return segment.row === foodRow && segment.col === foodCol;
      });
    }

    setFood({ row: foodRow, col: foodCol });
  };

  useEffect(() => {
    if (!food && rows > 0 && cols > 0) {
      spawnFood(rows, cols, snake);
    }
  }, [rows, cols, food]);

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
