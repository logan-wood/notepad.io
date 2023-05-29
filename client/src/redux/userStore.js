import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const UPDATE_SEARCH_TERM = "UPDATE_SEARCH_TERM";

export const setSearchTerm = (searchTerm) => ({
  type: 'SET_SEARCH_TERM',
  payload: searchTerm,
});

export const setSearchResults = (searchResults) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: searchResults,
});

export const cancelSearch = () => ({
  type: 'CANCEL_SEARCH',
});

const searchInitialState = {
  search: {
    searchTerm: '',
    searchResults: [],
  },
};

const searchReducer = (state = searchInitialState.search, action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
      };
    case 'CANCEL_SEARCH':
      return {
        ...state,
        searchResults: [],
      };
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
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };
