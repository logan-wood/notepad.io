import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Note = ({ SelectedClass, SelectedNote, updateNote }) => {
    
  
  // State hooks for note title and content
  const [noteTitle, setNoteTitle] = useState(
    SelectedNote ? SelectedNote.title : ""
  );
  const [noteContent, setNoteContent] = useState(
    SelectedNote ? SelectedNote.content : ""
  );

  // reference for Tiny MCE editor
  const editorRef = useRef(null);

  //handlers for when the note titles or content change
  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  //handler when focus on note is lost
  const handleTitleNoteBlur = () => {
    updateNote({
      ...SelectedNote,
      title: noteTitle,
      content: noteContent,
    });
  };

  //handler for editor change 
  const handleEditorChange = (content) => {
    setNoteContent(content);
  };

  //Tiny MCE initializer handler
  const handleEditorInit = (editor) => {
    editorRef.current = editor;
    editor.setContent(SelectedNote ? SelectedNote.content : "");
  };

  //effect hook that updates note titel and content when selected note prop is passed through
  useEffect(() => {
    setNoteTitle(SelectedNote ? SelectedNote.title : "");
    setNoteContent(SelectedNote ? SelectedNote.content : "");
    
  }, [SelectedNote]);

  //render if there isnt a selected class and/note
  if (!SelectedClass ) { 
    return <div className="note">Click on something...</div>;
  }
  else if (!SelectedNote)
  {
    return <div className="note">Click on something...</div>;
  }

  return (
    <div className="note">
      {SelectedClass && <h3>{SelectedClass.name}</h3>}
      <h1>{SelectedNote.title}</h1>
      <br></br>
      <Editor
        value={noteContent}
        onEditorChange={handleEditorChange}
        onInit={handleEditorInit}
        onBlur={handleTitleNoteBlur}
        init={{
          content_css: "writer",
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
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
