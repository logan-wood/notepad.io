import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressGameBar = ({ progress, onButtonClick }) => {

  const isComplete = progress == 100;


  function handleClick() {
    console.log("Button clicked!");
    // toDo
  }

  return (
    <div className="barContainerStyle">
      <div className="fillingContainerStyle" style={{ width: `${progress}%` }}>
        <span> {`${progress}%`}</span>

        {isComplete && (
          <button className="completeButton" onClick={onButtonClick}>
            Enter Bookville
          </button>
        )}
      </div>
    </div>
  );
};
export default ProgressGameBar;
