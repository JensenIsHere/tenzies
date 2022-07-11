import React from "react";
import Die from "./Die.js";

export default function Game(props) {
  const [won, setWon] = React.useState(true);
  const {
    dice,
    setDice,
    randDieRoll,
    time,
    toggleTimer,
    showCurrentTime,
    resetTimer,
    updateBestTimes,
  } = props;
  const displayDice = dice.map((x, pos) => {
    return (
      <Die
        key={pos + 1}
        pos={pos}
        number={x.num}
        isSelected={x.selected}
        handleClick={holdDice}
      />
    );
  });

  function rollDice() {
    setDice((prevDice) => {
      const newDice = prevDice.map((x) => {
        return !x.selected ? { ...x, num: randDieRoll() } : x;
      });
      return newDice;
    });
  }

  function holdDice(pos) {
    setDice((prevDice) => {
      const newDice = prevDice.map((x, xPos) => {
        return xPos === pos ? { ...x, selected: !x.selected } : x;
      });
      return newDice;
    });
  }

  function toggleWon() {
    setWon((prevWon) => !prevWon);
  }

  function checkWon() {
    for (let i = 1; i < dice.length; i++)
      if (dice[i].num !== dice[0].num || won) return;
    toggleWon();
    toggleTimer();
    updateBestTimes();
  }

  function resetGame() {
    toggleWon();
    setDice((prevDice) => {
      const newDice = prevDice.map((x) => {
        return { num: randDieRoll(), selected: false };
      });
      return newDice;
    });
    resetTimer();
    toggleTimer();
  }

  React.useEffect(() => {
    checkWon();
  }, [dice]);

  return (
    <div className="game">
      <h2 className="game--timer" id={time > 6000 ? "over60sec" : "under60sec"}>
        {showCurrentTime()}
      </h2>
      <div className="game--die_area">{displayDice}</div>
      <button
        className="game--button_roll"
        onClick={won ? resetGame : rollDice}
      >
        {won ? "Start" : "Roll"}
      </button>
    </div>
  );
}
