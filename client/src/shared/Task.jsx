import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Task.css";
import { useState, useEffect } from "react";

export default function Task({
  content,
  date,
  isChecked,
  onCheckboxChange,
  isFirst,
  onDeleteChange,
}) {
  const [isTicked, setIsTicked] = useState(isChecked);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsTicked(checked);
    onCheckboxChange(checked);
  };

  useEffect(() => {
    setIsTicked(isChecked); // Update the state when `isChecked` prop changes
    console.log(isTicked);
  }, [onCheckboxChange, isTicked]);
  

  const handleDeleteChange = () => {
    setIsDeleted(true);
    onDeleteChange(isDeleted);
  };

  const checkboxClassName = isTicked ? "task ticked" : "task";

  return (
    <div className={checkboxClassName}>
      <div className="taskContents">{content}</div>
      <div className="date">{date}</div>
      {isFirst ? (
        <div></div>
      ) : (
        <div>
          <Checkbox
            className="checkbox"
            checked={isTicked}
            onChange={handleCheckboxChange}
          />
          <DeleteIcon onClick={handleDeleteChange} className="deleteIcon" />
        </div>
      )}
    </div>
  );
}
