import React, { useState, useEffect, useRef } from "react";
import "./ShareModal.css";

const ShareModal = ({ onClose, isOpen }) => {
  const [copyingText, setCopyText] = useState(
    "https://notepad.io/sharelink/sdkfjhsdkjf"
  );
  
const sendEmail = () => {
  const subject = "I want to share a Note with you! Notepad.io";
  const body = "Click on this link! https://notepad.io/sharelink/sdkfjhsdkjf";
  const recipient = "";
  const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

const copyText  = async () => {
  if ("clipboard" in navigator) {
    await navigator.clipboard.writeText(copyingText);
  } else {
    document.execCommand("copy", true, copyingText);
  }
}


  return (
    <div className={`modalShareWrapper ${isOpen ? "open" : ""}`}>
      <div className="shareModal">
        <div className="shareHeader">
          <h1> Share this note!</h1>
          <button onClick={onClose}>x</button>
        </div>
        <hr />
        <div className="shareLinkContent">
          <input type="text" value={copyingText} readOnly  onClick={copyText}/>
          <button
            className="copyButton"
            //https://stackoverflow.com/questions/72495838/copy-text-to-clipboard-using-reactjs
            onClick={copyText}
          >
            📃
          </button>
        </div>
        <hr />
        <div className="shareEmail">
          <h3>Or send it via email</h3>
          <button
            className="emailShareButton"
            onClick={sendEmail}>✉</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
