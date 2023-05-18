import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Note = ({
  SelectedClass,
  SelectedNote,
  updateNote,
  updateClass,
  progress,
  updateProgress,
  isReset,
  isShared
}) => {
  //State hooks for className, Note Title, Note Content and Keyup
  const [className, setClassName] = useState(
    SelectedClass ? SelectedClass.name : ""
  );
  const [noteTitle, setNoteTitle] = useState(
    SelectedNote ? SelectedNote.title : ""
  );
  const [noteContent, setNoteContent] = useState(
    SelectedNote ? SelectedNote.content : ""
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
      ...SelectedNote,
      content: noteContent,
    });
  };

  //handler when focus on note is lost
  const handleTitleNoteBlur = () => {
    updateNote({
      ...SelectedNote,
      title: noteTitle,
    });
  };

  const handleClassNameBlur = () => {
    updateClass({
      ...SelectedClass,
      name: className,
    });
  };

  //handler for editor change
  const handleEditorChange = (content) => {
    setNoteContent(content);
    updateNote({
      ...SelectedNote,
      content: content,
    });
  };

  //Tiny MCE initializer handler
  const handleEditorInit = (editor) => {
    editorRef.current = editor;
    editor.setContent(SelectedNote ? SelectedNote.content : "");
    updateNote({
      ...SelectedNote,
      title: noteTitle,
      content: noteContent,
    });
  };

  //Handler for when key is pressed
  const handleKeyUp = (event) => {
    updateProgress((prevProgress) => {
      const newProgress = calculateProgress();
      updateProgress(newProgress);
      return newProgress;
    });
    setKeyUpCounter((prevCount) => prevCount + 1);
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
    setNoteTitle(SelectedNote ? SelectedNote.title : "");
    setNoteContent(SelectedNote ? SelectedNote.content : "");
    setClassName(SelectedClass ? SelectedClass.name : "");
  }, [SelectedNote,SelectedClass]);

  //Effect hook for updating the progress bar
  useEffect(() => {
    updateProgress(0);
    setKeyUpCounter(0);
  }, [isReset]);

  //render if there isnt a selected class and/note
  if (!SelectedClass) {
    return <div className="note">Click on something...</div>;
  } else if (!SelectedNote) {
    return <div className="note">Click on something...</div>;
  }

  return (
    <div className="note">
      {SelectedClass && !isShared (
        <input
          type="text"
          value={className}
          defaultValue={SelectedClass ? SelectedClass.Name : ""}
          onChange={handleClassNameChange}
          onBlur={handleClassNameBlur}
          className="noteClassStyle"
          maxLength={16}
        />
      )}
      <br></br>

      <input
        type="text"
        value={noteTitle}
        defaultValue={SelectedNote ? SelectedNote.title : ""}
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
