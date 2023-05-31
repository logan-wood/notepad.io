import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import UserComponent from "./UserComponent";

const Note = ({
  selectedClass,
  selectedNote,
  isShareNote,
  updateNote,
  updateClass,
  progress,
  updateProgress,
  isReset,
}) => {
  

  //variable for storing previous key
  const [previousKey,setPreviousKey] = useState("");

  //State hooks for className, Note Title, Note Content and Keyup
  const [className, setClassName] = useState(
    selectedClass ? selectedClass.name : ""
  );
  const [noteTitle, setNoteTitle] = useState(
    selectedNote ? selectedNote.title : ""
  );
  //const [shareNoteTitle, setShareNoteTitle] = useState(selectedShareNote ? selectedShareNote.title : "");

  const [noteContent, setNoteContent] = useState(
    selectedNote ? selectedNote.content : ""
  );
  const [keyUpCounter, setKeyUpCounter] = useState(0);

  // reference for Tiny MCE editor
  const editorRef = useRef(null);

  //handlers for when the Note Title, Class Name changes
  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  const handleClassNameChange = (e) => {
    setClassName(e.target.value);
  };

  //handler when focus on note, note title or class name is lost
  const handleNoteBlur = () => {
    updateNote({
      ...selectedNote,
      content: noteContent,
    });
  };

  //handler when focus on note is lost
  const handleTitleNoteBlur = () => {
    updateNote({
      ...selectedNote,
      title: noteTitle,
    });
  };

  const handleClassNameBlur = () => {
    updateClass({
      ...selectedClass,
      name: className,
    });
  };

  //handler for editor change
  const handleEditorChange = (content) => {
    setNoteContent(content);
    updateNote({
      ...selectedNote,
      content: content,
    });
  };

  //Tiny MCE initializer handler
  const handleEditorInit = (editor) => {
    editorRef.current = editor;
    editor.setContent(selectedNote ? selectedNote.content : "");
    updateNote({
      ...selectedNote,
      title: noteTitle,
      content: noteContent,
    });
  };

  //Handler for when key is pressed
  const handleKeyUp = (event) => {
    if (event.key === " ") {
      // Check if the key pressed is a space
      if(previousKey !== ' ' && previousKey!=="Enter" ){// check that the previous key was not a space
      updateProgress((prevProgress) => {
        const newProgress = calculateProgress();
        updateProgress(newProgress);
        return newProgress;
      });

      // Do not increase progress if p  revious was also a
      setKeyUpCounter((prevCount) => prevCount + 1); // Increment the word count
    }
  }
   setPreviousKey(event.key);

  };

  //Function for calculating progress in progress bar based on number of keypresses
  const calculateProgress = () => {
    if (progress < 100) {
      console.log("keyup", keyUpCounter);
      return (keyUpCounter / 100) * 100;
    } else {
      setKeyUpCounter(0);

      return 100;
    }
  };

  //effect hook that updates note title and content when selected note prop is passed through
  useEffect(() => {
    setNoteTitle(selectedNote ? selectedNote.title : "");
    setNoteContent(selectedNote ? selectedNote.content : "");
    setClassName(selectedClass ? selectedClass.name : "");
  }, [selectedNote, selectedClass, isShareNote]);

  //Effect hook for updating the progress bar
  useEffect(() => {
    updateProgress(0);
    setKeyUpCounter(0);
  }, [isReset]);

  //reSnder if there isnt a selected class and/note
  if (!selectedClass && !selectedNote) {
    if (!selectedClass) {
      return <div className="note">Click on something...</div>;
    }
  } else if (!selectedNote) {
    return <div className="note">Click on something...</div>;
  }
  return (
    <div className="note">
      {selectedClass && (
        <input
          type="text"
          value={className}
          defaultValue={selectedClass ? selectedClass.Name : ""}
          onChange={handleClassNameChange}
          onBlur={handleClassNameBlur}
          className="noteClassStyle"
          maxLength={16}
        />
      )}
      <br></br>

      {isShareNote && <UserComponent noteData={selectedNote} handleUpdateNote={updateNote}/>}
      <input
        type="text"
        value={noteTitle}
        defaultValue={selectedNote ? selectedNote.title : ""}
        onChange={handleTitleChange}
        onBlur={handleTitleNoteBlur}
        className="noteTitleStyle"
        maxLength={22}
      />
      <br></br>
      <Editor
        value={noteContent}
        onKeyUp={handleKeyUp}
        onEditorChange={handleEditorChange}
        onInit={handleEditorInit}
        onBlur={handleNoteBlur}
        init={{
          content_css: "writer",
          menubar: true,
          resize: false,
          plugins: [
            "textpatterns  autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount emoticons",
          ],
          textpattern_patterns: [
            { start: "*", end: "*", format: "italic" },
            { start: "**", end: "**", format: "bold" },
            { start: "#", format: "h1" },
            { start: "##", format: "h2" },
            { start: "###", format: "h3" },
            { start: "####", format: "h4" },
            { start: "#####", format: "h5" },
            { start: "######", format: "h6" },
            // The following text patterns require the `lists` plugin
            { start: "1. ", cmd: "InsertOrderedList" },
            { start: "* ", cmd: "InsertUnorderedList" },
            { start: "- ", cmd: "InsertUnorderedList" },
          ],
          toolbar: [
            "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
          ],
        }}
      />
    </div>
  );
};
export default Note;
