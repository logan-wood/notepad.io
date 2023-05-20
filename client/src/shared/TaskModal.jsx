import { useState } from "react";
import "./TaskModal.css";

export default function Loading(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonClass, setButtonClass] = useState("taskClose");

  const handleClick = () => {
    setIsOpen(!isOpen);
    setButtonClass(
      isOpen ? "taskClose taskCloseAnimation" : "taskOpen taskOpenAnimation"
    );
  };

  return (
    <div className="modalContainer">
      <div className={buttonClass} onClick={handleClick}>
        {isOpen ? "Open" : "Closed"}
      </div>
    </div>
  );
}
