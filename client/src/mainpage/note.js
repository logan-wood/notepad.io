import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Note = ({ SelectedClass, SelectedNote, updateNote }) => {
  const [noteTitle, setNoteTitle] = useState(
    SelectedNote ? SelectedNote.title : ""
  );
  const [noteContent, setNoteContent] = useState(
    SelectedNote ? SelectedNote.content : ""
  );
  const editorRef = useRef(null);

  const handleTitleChange = (e) => {
    setNoteTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handleTitleNoteBlur = () => {
    updateNote({
      ...SelectedNote,
      title: noteTitle,
      content: noteContent,
    });
  };
  const handleEditorChange = (content) => {
    setNoteContent(content);
  };

  const handleEditorInit = (editor) => {
    editorRef.current = editor;
    editor.setContent(SelectedNote ? SelectedNote.content : "");
  };

  useEffect(() => {
    setNoteTitle(SelectedNote ? SelectedNote.title : "");
    setNoteContent(SelectedNote ? SelectedNote.content : "");
    
  }, [SelectedNote]);

  if (!SelectedClass || !SelectedNote) {
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
