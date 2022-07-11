import React from "react";

export default function Records(props) {
  const { bestTimes, renderTimer, resetBestTimes } = props;
  return (
    <div className="records">
      <div className="records--left">
        <h1 className="records--title">Best Times</h1>
        <button className="records--button_reset" onClick={resetBestTimes}>
          Reset
        </button>
      </div>
      <div className="records--right">
        <div className="records--places">
          <p className="records--place_1st">1st</p>
          <p className="records--place_2nd">2nd</p>
          <p className="records--place_3rd">3rd</p>
          <p className="records--place_4th">4th</p>
          <p className="records--place_5th">5th</p>
        </div>
        <div className="records--times">
          <p className="records--time_1st">{renderTimer(bestTimes[0])}</p>
          <p className="records--time_2nd">{renderTimer(bestTimes[1])}</p>
          <p className="records--time_3rd">{renderTimer(bestTimes[2])}</p>
          <p className="records--time_4th">{renderTimer(bestTimes[3])}</p>
          <p className="records--time_5th">{renderTimer(bestTimes[4])}</p>
        </div>
      </div>
    </div>
  );
}
