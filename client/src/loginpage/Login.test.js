import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

test('renders Log in title', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const titleElement = screen.getByText(/Log in/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Sign in with Email button', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const buttonElement = screen.getByText(/Sign in with Email/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders Sign in with Google button', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const buttonElement = screen.getByText(/Sign in with Google/i);
  expect(buttonElement).toBeInTheDocument();
});
