import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, fireEvent } from '@testing-library/react';
import SearchModal from './SearchModal';
import { rootReducer } from '../redux/userStore';
import { toBeInTheDocument } from '@testing-library/jest-dom/extend-expect';

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('SearchModal', () => {
  it('renders the modal', () => {
    const { getByText } = renderWithRedux(
      <SearchModal isOpen={true} onRequestClose={() => {}} />
    );
    expect(getByText('Search notes')).toBeInTheDocument();
  });

  it('submits the search form', () => {
    const store = createStore(rootReducer);
    store.dispatch = jest.fn();

    const { getByPlaceholderText, getByLabelText, getByText } = renderWithRedux(
      <SearchModal isOpen={true} onRequestClose={() => {}} />,
      { store }
    );

    fireEvent.change(getByPlaceholderText('Enter search term'), {
      target: { value: 'My note' },
    });
    fireEvent.click(getByLabelText('Content'));
    fireEvent.change(getByLabelText('Enter a date'), {
      target: { value: '2023-05-21' },
    });
    fireEvent.click(getByLabelText('After'));
    fireEvent.click(getByText('Search'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SEARCH_NOTES',
      payload: {
        searchTerm: 'My note',
        searchBy: 'content',
        searchDate: '2023-05-21',
        isBefore: false,
      },
    });
  });
});
