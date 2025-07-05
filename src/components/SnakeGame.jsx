import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BOARD_SIZE = 18;
const INIT_SPEED = 9;

const getRandomPos = () =>
  ({
    x: Math.floor(1 + Math.random() * (BOARD_SIZE - 2)),
    y: Math.floor(1 + Math.random() * (BOARD_SIZE - 2)),
  });

const getInitialSnake = () => [getRandomPos()];

export default function SnakeGame() {
  const [snake, setSnake] = useState(getInitialSnake());
  const [food, setFood] = useState(getRandomPos());
  const [bonus, setBonus] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    Number(localStorage.getItem("hscore") || 0)
  );
  const [inputDir, setInputDir] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(INIT_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  const moveSound = useRef(null);
  const foodSound = useRef(null);
  const gameOverSound = useRef(null);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === "INPUT") return;
      let dir = { ...inputDir };
      switch (e.key) {
        case "ArrowUp":
          dir = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          dir = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          dir = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          dir = { x: 1, y: 0 };
          break;
        default:
          return;
      }
      setInputDir(dir);
      if (moveSound.current) {
        moveSound.current.currentTime = 0;
        moveSound.current.play();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line
  }, [inputDir]);

  // Main game loop
  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        // Move body
        for (let i = newSnake.length - 1; i > 0; i--) {
          newSnake[i] = { ...newSnake[i - 1] };
        }
        // Move head
        newSnake[0] = {
          x: newSnake[0].x + inputDir.x,
          y: newSnake[0].y + inputDir.y,
        };

        // Check collision
        if (
          newSnake[0].x < 1 ||
          newSnake[0].x > BOARD_SIZE ||
          newSnake[0].y < 1 ||
          newSnake[0].y > BOARD_SIZE ||
          newSnake.slice(1).some((s) => s.x === newSnake[0].x && s.y === newSnake[0].y)
        ) {
          setGameOver(true);
          if (gameOverSound.current) {
            gameOverSound.current.currentTime = 0;
            gameOverSound.current.play();
          }
          return getInitialSnake();
        }

        // Check food
        if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
          setScore((s) => s + 10);
          setFood(getRandomPos());
          newSnake.unshift({
            x: newSnake[0].x + inputDir.x,
            y: newSnake[0].y + inputDir.y,
          });
          if (foodSound.current) {
            foodSound.current.currentTime = 0;
            foodSound.current.play();
          }
        }

        // Check bonus
        if (bonus && newSnake[0].x === bonus.x && newSnake[0].y === bonus.y) {
          setScore((s) => s + 50);
          setBonus(null);
          setShowBonus(true);
          setTimeout(() => setShowBonus(false), 1200);
        }

        return newSnake;
      });
      // eslint-disable-next-line
    }, 1000 / speed);
    return () => clearInterval(interval);
  }, [inputDir, food, bonus, speed, gameOver, paused]);

  // Bonus item spawner
  useEffect(() => {
    if (gameOver || paused) return;
    const interval = setInterval(() => {
      if (!bonus && Math.random() < 0.3) {
        setBonus(getRandomPos());
        setTimeout(() => setBonus(null), 5000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [bonus, gameOver, paused]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("hscore", score);
    }
    // eslint-disable-next-line
  }, [score]);

  // Reset game
  const handleRestart = () => {
    setSnake(getInitialSnake());
    setFood(getRandomPos());
    setBonus(null);
    setScore(0);
    setInputDir({ x: 0, y: 0 });
    setGameOver(false);
    setPaused(false);
  };

  return (
    <div className="bg-snake-custom bg-cover bg-no-repeat font-sans min-h-screen flex flex-col justify-center items-center" style={{ fontFamily: "Inter, sans-serif" }}>
      <Link to="/" className="absolute top-4 left-4 px-4 py-2 bg-cyan-700 text-white rounded-lg font-bold shadow hover:bg-cyan-800 transition-colors duration-200">← Back</Link>
      <div className="w-full min-h-screen flex flex-col justify-center items-center p-2 sm:p-1">
        <div className="board bg-cyan-700 border-4 border-cyan-900 border-solid shadow-xl rounded-2xl lg:h-[558px] lg:w-[600px] md:h-[400px] md:w-[400px] sm:h-[320px] sm:w-[320px] h-[90vw] w-[90vw] max-w-[600px] max-h-[558px] mt-7 grid" style={{
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`
        }}>
          {/* Snake */}
          {snake.map((seg, idx) => (
            <div
              key={idx}
              style={{ gridRowStart: seg.y, gridColumnStart: seg.x }}
              className={idx === 0 ? "head" : "snake"}
            />
          ))}
          {/* Food */}
          <div
            style={{ gridRowStart: food.y, gridColumnStart: food.x }}
            className="food"
          />
          {/* Bonus */}
          {bonus && (
            <div
              style={{ gridRowStart: bonus.y, gridColumnStart: bonus.x }}
              className="bonus"
            />
          )}
        </div>
        {/* Controls */}
        <div className="absolute top-6 right-6 flex flex-col gap-4 items-end bg-white/60 rounded-lg shadow p-4 max-w-xs w-[220px]">
          <div className="bg-cyan-100/80 px-3 py-1 rounded-md shadow-inner mb-1 w-full flex justify-end">
            <span className="text-cyan-900 font-bold text-base text-right tracking-wide">High Score : {highScore}</span>
          </div>
          <div className="text-cyan-900 font-semibold text-xl text-right">
            Score : {score}
          </div>
          {/* Speed Control */}
          <div className="flex flex-col items-end mt-1 w-full">
            <label htmlFor="speedControl" className="text-cyan-900 text-sm font-medium mb-1">Speed:</label>
            <input
              id="speedControl"
              type="range"
              min="5"
              max="20"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-full accent-cyan-900 h-2 rounded-lg appearance-none bg-gray-300 outline-none transition-all duration-200 dark-slider"
            />
            <span className="text-cyan-900 text-xs mt-1 font-semibold">{speed}</span>
          </div>
          {/* Pause/Resume Button */}
          <button
            onClick={() => setPaused(p => !p)}
            className="mt-2 px-4 py-2 bg-cyan-700 text-white rounded-lg font-bold text-base shadow hover:bg-cyan-800 transition-colors duration-200 w-full"
          >
            {paused ? "Resume" : "Pause"}
          </button>
          {/* Bonus Indicator */}
          {showBonus && (
            <div className="mt-2 text-xs text-yellow-600 font-semibold">Bonus active!</div>
          )}
        </div>
      </div>
      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed z-10 inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center text-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-xs sm:max-w-md flex flex-col items-center border-4 border-cyan-700 relative">
            <div className="text-4xl mb-2">💀</div>
            <h2 className="text-2xl font-extrabold text-cyan-800 mb-2 tracking-wide">Game Over</h2>
            <p className="mb-4 text-base sm:text-lg font-medium text-cyan-900">Better luck next time!<br />Press OK to play again.</p>
            <div className="flex flex-col items-center mb-4 w-full">
              <div className="text-cyan-700 font-bold text-lg">Final Score: {score}</div>
              <div className="text-cyan-900 font-semibold text-base">High Score: {highScore}</div>
            </div>
            <button
              onClick={handleRestart}
              className="px-8 py-2 bg-cyan-700 text-white rounded-lg font-bold text-lg shadow hover:bg-cyan-800 transition-colors duration-200 mt-2"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* Audio elements */}
      <audio ref={moveSound} src="/music/move2.mp3" preload="auto" />
      <audio ref={foodSound} src="/music/eat.mp3" preload="auto" />
      <audio ref={gameOverSound} src="/music/gameover2.wav" preload="auto" />
    </div>
  );
}