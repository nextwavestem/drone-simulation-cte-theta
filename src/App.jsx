import { useEffect, useState } from 'react';
import './App.css';
import sausageDogImg from './assets/jenny.png'; // Add image to assets folder
import flowerImg from './assets/flower.png'; // Add image to assets folder

const GRID_SIZE = 20;
const INITIAL_DOG = [{ x: 10, y: 10 }];
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE),
  };
}

function App() {
  const [dog, setDog] = useState(INITIAL_DOG);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [ball, setBall] = useState(getRandomPosition());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (DIRECTIONS[e.key]) {
        setDirection(DIRECTIONS[e.key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setDog((prevDog) => {
        const newHead = {
          x: (prevDog[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
          y: (prevDog[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
        };

        let newDog = [newHead, ...prevDog];

        if (newHead.x === ball.x && newHead.y === ball.y) {
          setBall(getRandomPosition());
        } else {
          newDog.pop();
        }

        return newDog;
      });
    }, 200);

    return () => clearInterval(moveInterval);
  }, [direction, ball]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isDogSegment = dog.find((segment) => segment.x === x && segment.y === y);
        const isBall = ball.x === x && ball.y === y;
        cells.push(
          <div key={`${x}-${y}`} className="cell">
            {isDogSegment && <img src={sausageDogImg} alt="dog" className="dog-img" />}
            {isBall && <img src={flowerImg} alt="dog" className="ball" />}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="game">
      <h1>Compete for the high score!</h1>
      <div className="grid">{renderGrid()}</div>
    </div>
  );
}

export default App;