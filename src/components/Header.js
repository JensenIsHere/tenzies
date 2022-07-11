import React from "react";

export default function Header() {
  return (
    <nav>
      <div className="header">
        <h2 className="header--title">Tenzies</h2>
        <div className="header--instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </div>
      </div>
    </nav>
  );
}
