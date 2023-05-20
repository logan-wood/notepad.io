import Checkbox from "@mui/material/Checkbox";
import "./Task.css";
import { useState, useEffect } from "react";

export default function Task({
  content,
  date,
  isChecked,
  onCheckboxChange,
  isFirst,
}) {
  const [isTicked, setIsTicked] = useState(isChecked);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsTicked(checked);
    onCheckboxChange(checked);
  };

  useEffect(() => {
    setIsTicked(isChecked); // Update the state when `isChecked` prop changes
    console.log(isTicked);
  }, [isChecked]);

  const checkboxClassName = isTicked ? "task ticked" : "task";

  return (
    <div className={checkboxClassName}>
      <div className="taskContents">{content}</div>
      <div className="date">{date}</div>
      {isFirst ? (
        <div></div>
      ) : (
        <Checkbox
          className="checkbox"
          checked={isTicked}
          onChange={handleCheckboxChange}
        />
      )}
    </div>
  );
}
