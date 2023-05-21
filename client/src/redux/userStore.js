import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Note reducer
const notesInitialState = {
  notes: [],
  searchResults: [],
};

const noteReducer = (state = notesInitialState, action) => {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'SEARCH_NOTES':
      const results = state.notes.filter(note => {
        const { title, content, date } = note;
        const { searchTerm, searchBy, searchDate, isBefore } = action.payload;
        
        const isMatchTerm = searchBy === 'title'
          ? title.includes(searchTerm)
          : content.includes(searchTerm);

        const isMatchDate = isBefore
          ? new Date(date) <= new Date(searchDate)
          : new Date(date) >= new Date(searchDate);
        
        return isMatchTerm && isMatchDate;
      });
      return { ...state, searchResults: results };
    default:
      return state;
  }
};

// User reducer
const userInitialState = {
  user: null,
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'CLEAR_USER':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  note: noteReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
