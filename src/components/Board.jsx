import React, { useEffect, useRef, useState } from "react";
import BoardCell from "./BoardCell";
import GameOver from "./GameOver";
import GameWin from "./GameWin";
import PausePage from "./PausePage";

const blockSize = 30;

const Board = ({ score, setScore, highScore, setHighScore }) => {
  const boardRef = useRef(null);

  const calculateHS = () => {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    }
  };

  const [isPause, setIsPause] = useState(false);

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const [snake, setSnake] = useState([{ row: 0, col: 0 }]);

  const directionRef = useRef("right");

  const [food, setFood] = useState(null);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

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

  useEffect(() => {
    if (isGameOver) {
      return;
    }

    if (isWinner) {
      return;
    }

    if (isPause) {
      return;
    }

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

        if (
          head.row < 0 ||
          head.col < 0 ||
          head.row >= rows ||
          head.col >= cols
        ) {
          setIsGameOver(true);
          return prev;
        }

        let snakeBites = prev.some(
          (segment) => segment.row === head.row && segment.col === head.col,
        );

        if (snakeBites) {
          setIsGameOver(true);
          return prev;
        }

        let newSnake = [head, ...prev];

        if (head.row === food.row && head.col === food.col) {
          setScore((prev) => prev + 1);
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
  }, [rows, cols, food, isGameOver, isWinner, isPause]);

  useEffect(() => {
    const handleKey = (dets) => {
      if (dets.key === "Space" || dets.key === "Escape") {
        setIsPause((prev) => !prev);
        return;
      }

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
  }, []);

  useEffect(() => {}, []);

  const spawnFood = (currRows, currCols, currSnake) => {
    let foodRow, foodCol;

    let isOnSnake = true;

    if (snake.length === rows * cols) {
      setIsWinner(true);
      return;
    }

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

  const renderCells = () => {
    const cells = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let isSnake = snake.some(
          (segment) => segment.row === i && segment.col === j,
        );

        let isFood = food && food.row === i && food.col === j;

        cells.push(
          <BoardCell
            key={`${i}-${j}`}
            isSnake={isSnake}
            isFood={isFood}
            isHead={
              snake.length > 0 && snake[0].row === i && snake[0].col === j
            }
            blockSize={blockSize}
          />,
        );
      }
    }

    return cells;
  };

  useEffect(() => {
    if (isGameOver) calculateHS();
  }, [isGameOver]);

  const restartGame = () => {
    setSnake([{ row: 0, col: 0 }]);
    setFood(null);
    setIsGameOver(false);
    setIsWinner(false);
    setIsPause(false);
    directionRef.current = "right";
    setScore(0);
  };

  const resumeGame = () => {
    setIsPause((prev) => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={boardRef}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${blockSize}px)`,
        }}
        className="h-full w-full"
      >
        {renderCells()}
      </div>

      {isPause && (
        <PausePage
          score={score}
          resumeGame={resumeGame}
          restartGame={restartGame}
        />
      )}

      {isGameOver && <GameOver score={score} restartGame={restartGame} />}

      {isWinner && <GameWin score={score} restartGame={restartGame} />}
    </div>
  );
};

export default Board;
