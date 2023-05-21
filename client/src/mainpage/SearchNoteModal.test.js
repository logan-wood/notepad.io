import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/userStore';
import SearchNotesModal from '../mainpage/SearchNotesModal';

test('renders SearchNotesModal and performs a search', () => {
  render(
    <Provider store={store}>
      <SearchNotesModal />
    </Provider>
  );
  
  const searchButtonElement = screen.getByText(/search/i);
  expect(searchButtonElement).toBeInTheDocument();
  
  const searchInput = screen.getByPlaceholderText(/search term/i);
  fireEvent.change(searchInput, { target: { value: 'Test' } });
  expect(searchInput.value).toBe('Test');
  
  const searchByTitleButton = screen.getByText(/title/i);
  fireEvent.click(searchByTitleButton);

  const searchDateInput = screen.getByPlaceholderText(/date/i);
  fireEvent.change(searchDateInput, { target: { value: '2023-05-21' } });
  expect(searchDateInput.value).toBe('2023-05-21');
  
  const beforeDateButton = screen.getByText(/before/i);
  fireEvent.click(beforeDateButton);

  fireEvent.click(searchButtonElement);
});
