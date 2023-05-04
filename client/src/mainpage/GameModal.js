import React from "react";
import "./GameModal.css"

const GameModal = ({ onClose, isOpen }) => {
    
  const handleExit = () => {
    console.log("close")
    onClose();
  };

  return (
    <div className={`modalWrapper ${isOpen ? "open" : ""}`}>
    <div className="gameModal">
      <iframe src="../../index.html" title="Game"  />
      <div className="modalContent">
        <button onClick={handleExit}>Exit Game</button>
      </div>
    </div>
    </div>
  );
};

export default GameModal;