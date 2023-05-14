import React, { useState, useEffect } from "react";
import "./ShareModal.css";

const ShareModal = ({ onClose, isOpen }) => {
  const [copyText, setCopyText] = useState(
    "https://notepad.io/sharelink/sdkfjhsdkjf"
  );
  const handleWrapperClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modalShareWrapper ${isOpen ? "open" : ""}`}
      onClick={handleWrapperClick}
    >
      <div className="shareModal">
        <h1> Share this note!</h1>
        <hr />
        <input type="text" value={copyText} readOnly />

        <div className="modalContent">
          <button
            className="share"
            //https://stackoverflow.com/questions/72495838/copy-text-to-clipboard-using-reactjs
            onClick={async () => {
              if ("clipboard" in navigator) {
                await navigator.clipboard.writeText(copyText);
              } else {
                document.execCommand(
                  "copy",
                  true,
                  copyText
                );
              }
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
