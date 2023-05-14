import React, { useState, useEffect } from "react";
import CopyToClipboard from "copy-to-clipboard";
import "./ShareModal.css";

const ShareModal = ({ onClose, isOpen }) => {
    const [copyText, setCopyText] = useState("https://notepad.io/sharelink/sdkfjhsdkjf");

    const handleCopy = () => {
      console.log("Copied");
    };
  return (
    <div className={`modalShareWrapper ${isOpen ? "open" : ""}`}>
      <div className="shareModal">
        <h1> Share this note!</h1>
        <hr />
        <input type="text" value={copyText} readOnly />

        <div className="modalContent">
            <button className="share" onClick={handleCopy}>
              Copy
            </button>
          <CopyToClipboard text="https://notepad.io/sharelink/sdkfjhsdkjf"/>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
