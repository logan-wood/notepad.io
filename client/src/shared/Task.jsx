import Checkbox from "@mui/material/Checkbox";
import "./Task.css";
import { useState, useEffect } from "react";

export default function Task({ content, isChecked }) {
  const [isTicked, setIsTicked] = useState(isChecked);

  const handleTaskClick = () => {
    setIsTicked(!isTicked);
  };
  const checkboxClassName = isTicked ? "task ticked" : "task";

  return (
    <div className={checkboxClassName}>
      <div className="taskContents">{content}</div>
      <Checkbox
        className="checkbox"
        checked={isTicked}
        onClick={handleTaskClick}
      />
    </div>
  );
}
