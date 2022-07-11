import React from "react";

export default function Die(props) {
  const { pos, number, isSelected, handleClick } = props;
  return (
    <div
      className={isSelected ? "die selected" : "die"}
      onClick={() => handleClick(pos)}
    >
      <p className="die--number">{number}</p>
    </div>
  );
}
