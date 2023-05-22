import React, { useState, useEffect, useRef } from "react";
import "./ShareModal.css";

const ShareModal = ({ onClose, isOpen, noteId, classId, uid }) => {
  const [URL, setURL] = useState("");
  const [userUID, setUserUID] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const updatedURL =
      process.env.REACT_APP_API_DOMAIN + "/note/" + noteId + "/addSharedUser";
    setURL(updatedURL);
  }, [noteId]);

  useEffect(() => {
    setError("");
  }, [onClose]);

  const sendEmail = () => {
    const subject = "I want to share a Note with you! Notepad.io";
    const body = `Click on this link! ${URL}`;
    const recipient = "";
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(
      body
    )}`;
    window.location.href = mailtoLink;
  };

  const copyText = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(URL);
    } else {
      document.execCommand("copy", true, URL);
    }
  };

  const setNoteAsShared = (uid, classId, noteId) => {
    if (classId !== undefined) {
      const url =
        process.env.REACT_APP_API_DOMAIN +
        "/user/" +
        uid +
        "/setSharedNote?classId=" +
        classId +
        "&noteId=" +
        noteId;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            // Handle success if needed
            console.log("Note set as shared");
          } else {
            // Handle failure if needed
            console.error("Failed to set note as shared");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // handle for updating the
  const handleAddSharedUser = (noteId, newEmail) => {
    const url =
      process.env.REACT_APP_API_DOMAIN +
      "/note/" +
      noteId +
      "/addSharedUser?newEmail=" +
      newEmail;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Make sure to set the content type of the request body
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
      body: JSON.stringify({
        noteId: noteId,
        email: newEmail,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Handle success if needed
          setError("User added");
        } else {
          setError("Failed to add the shared user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`modalShareWrapper ${isOpen ? "open" : ""}`}>
      <div className="shareModal">
        <div className="shareHeader">
          <h1> Share this note!</h1>
          <button class="redButton" onClick={onClose}>
            x
          </button>
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
        <h3>Or share it with a user via their UID:</h3>

        <div className="shareLinkContent">
          <input
            type="text"
            value={userUID}
            onChange={(e) => setUserUID(e.target.value)}
          />
          <button
            class="redButton"
            onClick={() => {
              setNoteAsShared(uid, classId, noteId);
              handleAddSharedUser(noteId, userUID);

            }}>
            Share
          </button>
        </div>
        {error && <p className="error">{error}</p>}

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
