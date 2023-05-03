import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressGameBar = (props) => {
  const [progress, setProgress] = useState(0);
  const isComplete = progress == 100;

  function handleClick() {
    //toDO
  }

  useEffect(() => {
    console.log(progress);
    setProgress(props.progress);
  }, [props.progress]);
  useEffect(() => {
    console.log(isComplete); // Check the isComplete value in the console
  }, [isComplete]);
  function handleClick() {
    console.log("Button clicked!");
    // toDo
  }

  return (
    <div className="barContainerStyle">
      <div className="fillingContainerStyle" style={{ width: `${progress}%` }}>
        <span> {`${progress}%`}</span>

        {isComplete && (
          <button className="completeButton" onClick={handleClick}>
            Enter Bookville
          </button>
        )}
      </div>
    </div>
  );
};
export default ProgressGameBar;
