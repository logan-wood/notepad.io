import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

const SearchModal = ({ isOpen, onRequestClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [searchDate, setSearchDate] = useState(null);
  const [isBefore, setIsBefore] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SEARCH_NOTES', payload: { searchTerm, searchBy, searchDate, isBefore } });
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Search notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <div>
          <label>
            <input
              type="radio"
              value="title"
              checked={searchBy === 'title'}
              onChange={(e) => setSearchBy(e.target.value)}
            />
            Title
          </label>
          <label>
            <input
              type="radio"
              value="content"
              checked={searchBy === 'content'}
              onChange={(e) => setSearchBy(e.target.value)}
            />
            Content
          </label>
        </div>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <div>
          <label>
            <input
              type="radio"
              value={true}
              checked={isBefore}
              onChange={(e) => setIsBefore(e.target.value)}
            />
            Before
          </label>
          <label>
            <input
              type="radio"
              value={false}
              checked={!isBefore}
              onChange={(e) => setIsBefore(e.target.value)}
            />
            After
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
    </Modal>
  );
};

export default SearchModal;
