import React,{ useEffect} from "react";
import "./GameModal.css"

const GameModal = ({ onClose, isOpen }) => {
    
  const handleExit = () => {
    console.log("close")
    onClose();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleExit();
    },1*10 * 1000); // 3 minutes in milliseconds
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  return (
    <div className={`modalGameWrapper ${isOpen ? "open" : ""}`}>
    <div className="gameModal">
      <iframe src="http://localhost:1234" title="Game" />
      <div className="modalContent">
        <button onClick={handleExit}>Exit Game</button>
      </div>
    </div>
    </div>
  );
};

export default GameModal;