import React, { useState, useEffect, useRef } from "react";
import "./ShareModal.css";

const ShareModal = ({ onClose, isOpen, noteId}) => {
    const [URL, setURL] = useState("");
  const [username, setUsername] = useState("");

   useEffect(() => {
     const updatedURL = process.env.REACT_APP_API_DOMAIN + "/note/" + noteId + "/addSharedUser";
     setURL(updatedURL);
   }, [noteId]);

const sendEmail = () => {
  const subject = "I want to share a Note with you! Notepad.io";
  const body = `Click on this link! ${URL}`;
  const recipient = "";
  const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

const copyText  = async () => {
  if ("clipboard" in navigator) {
    await navigator.clipboard.writeText(URL);
  } else {
    document.execCommand("copy", true, URL);
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
          <input type="text" value={URL} readOnly onClick={copyText} />
          <button
            className="copyButton"
            //https://stackoverflow.com/questions/72495838/copy-text-to-clipboard-using-reactjs
            onClick={copyText}>
            📃
          </button>
        </div>
        <hr />
        <h3>Or share it with a user:</h3>

        <div className="shareLinkContent">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <button>Share</button>
        </div>
        <div className="shareEmail">
          <h3>Or send it via email</h3>
          <button className="emailShareButton" onClick={sendEmail}>
            ✉
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
