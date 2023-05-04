import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Note = ({ SelectedClass, SelectedNote, updateNote, updateClass , updateProgress,isReset}) => {
  const [className, setClassName] = useState(
    SelectedClass ? SelectedClass.name : ""
  );
  const [progress, setProgress] = useState(0);

  // State hooks for note title and content
  const [noteTitle, setNoteTitle] = useState(
    SelectedNote ? SelectedNote.title : ""
  );
  const [noteContent, setNoteContent] = useState(
    SelectedNote ? SelectedNote.content : ""
  );
  const [keyUpCounter, setKeyUpCounter] = useState(0);
  // reference for Tiny MCE editor
  const editorRef = useRef(null);


  //handlers for when the note titles or content change
  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };

  //handlers for when the note titles or content change
  const handleClassNameChange = (e) => {
    setClassName(e.target.value);
  };

  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
   
  };

  //handler when focus on note is lost
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
  //handler when focus on note is lost
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

  //effect hook that updates note titel and content when selected note prop is passed through
  useEffect(() => {
    setNoteTitle(SelectedNote ? SelectedNote.title : "");
    setNoteContent(SelectedNote ? SelectedNote.content : "");
    setClassName(SelectedClass ? SelectedClass.name : "");
   
  }, [SelectedNote]);

  useEffect(() => {
    if (isReset) {
      setProgress(0);
    }
  }, [isReset]);

  //render if there isnt a selected class and/note
  if (!SelectedClass) {
    return <div className="note">Click on something...</div>;
  } else if (!SelectedNote) {
    return <div className="note">Click on something...</div>;
  }

  const handleKeyUp  = (event) => {
    setProgress((prevProgress) => {
      const newProgress = calculateProgress();
      updateProgress(newProgress);
      return newProgress;
    });
  };
  
  const calculateProgress = () => {
    if (progress < 100) {
      const newKeyUpCount = progress + 1;
      return (newKeyUpCount / 120) * 100;
    } else {
      return 100;
    }
  
  };

  return (
    <div className="note">
      {SelectedClass && (
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
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount emoticons",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
      />
    </div>
  );
};
export default Note;
