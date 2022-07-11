import React from "react";
import Header from "./Header";
import Game from "./Game";
import Records from "./Records";

export default function App() {
  const [dice, setDice] = React.useState(
    [...Array(10)].map((x) => {
      return { num: randDieRoll(), selected: false };
    })
  );

  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [bestTimes, setBestTimes] = React.useState([...Array(5)].map((x) => 0));

  React.useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  function toggleTimer() {
    setRunning((prevRunning) => !prevRunning);
  }

  function renderTimer(timer) {
    return `${timer > 600 ? Math.floor(timer / 600) + ":" : ""}${
      timer > 600
        ? padNum(Math.floor((timer % 600) / 10))
        : Math.floor((timer % 600) / 10)
    }.${timer % 10}`;
  }

  function showCurrentTime() {
    return renderTimer(time);
  }

  function padNum(num) {
    return num.toString().padStart(2, "0");
  }

  function resetTimer() {
    setTime((prevTimer) => 0);
  }

  function randDieRoll() {
    return Math.ceil(Math.random() * 6);
  }

  function updateBestTimes() {
    setBestTimes((prevBestTimes) => {
      let newBestTimes = prevBestTimes;
      for (let i = 0; i < prevBestTimes.length; i++) {
        if (newBestTimes[i] > time || newBestTimes[i] === 0) {
          newBestTimes.splice(i, 0, time);
          newBestTimes.pop();
          break;
        }
      }
      return newBestTimes;
    });
  }

  function resetBestTimes() {
    setBestTimes((prevBestTimes) => [...Array(5)].map((x) => 0));
  }

  return (
    <div className="app">
      <Header />
      <Game
        dice={dice}
        setDice={setDice}
        randDieRoll={randDieRoll}
        time={time}
        toggleTimer={toggleTimer}
        showCurrentTime={showCurrentTime}
        resetTimer={resetTimer}
        updateBestTimes={updateBestTimes}
      />
      <Records
        bestTimes={bestTimes}
        renderTimer={renderTimer}
        resetBestTimes={resetBestTimes}
      />
    </div>
  );
}
