import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import "./SearchModal.css";
import { Button } from "react-bootstrap";

const SearchModal = ({ isOpen, onRequestClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_NOTES",
      payload: { searchTerm, searchBy },
    });
    onRequestClose();
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="search-modal"
    >
    
      <h2 className="search-modal-title">Search notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="search-modal-content">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
          />
        </div>
        <div className="search-modal-content">
          <label>
            <input
              type="radio"
              value="title"
              checked={searchBy === "title"}
              onChange={(e) => setSearchBy(e.target.value)}
            />
            Title
          </label>
          <label>
            <input
              type="radio"
              value="content"
              checked={searchBy === "content"}
              onChange={(e) => setSearchBy(e.target.value)}
            />
            Content
          </label>
        </div>
        <div className="search-modal-buttons">
          <Button onClick={handleSubmit} className="search-modal-button">
            Search
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SearchModal;