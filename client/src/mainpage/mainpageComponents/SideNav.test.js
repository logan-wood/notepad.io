import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SideNav from './SideNav'; 

describe('Search Functionality', () => {
  let component;
  const mockData = {
    classes: [
      {
        id: '1',
        name: 'Class 1',
        notes: [
          {
            id: '1',
            title: 'Note 1',
            content: 'Content 1',
          },
          {
            id: '2',
            title: 'Note 2',
            content: 'Content 2',
          },
        ],
        noteSize: 2,
      },
      {
        id: '2',
        name: 'Class 2',
        notes: [],
        noteSize: 0,
      },
    ],
    sharedNotes: [
      {
        id: '1',
        title: 'Shared Note 1',
        content: 'Shared Content 1',
      },
      {
        id: '2',
        title: 'Shared Note 2',
        content: 'Shared Content 2',
      },
    ],
  };

  const mockFunctions = {
    toggleNav: jest.fn(),
    onSelectClass: jest.fn(),
    onSelectNote: jest.fn(),
    onShareNote: jest.fn(),
  };

  beforeEach(() => {
    component = render(<SideNav data={mockData} {...mockFunctions} />);
  });

  it('should display the classes and shared notes when no search term is entered', () => {
    expect(component.getByText('Class 1')).toBeTruthy();
    expect(component.getByText('Class 2')).toBeTruthy();
    expect(component.getByText('Shared Note 1')).toBeTruthy();
    expect(component.getByText('Shared Note 2')).toBeTruthy();
  });

  it('should filter the classes and shared notes based on the search term', () => {
    fireEvent.change(component.getByPlaceholderText('Search...'), {
      target: { value: 'Class 2' },
    });
    expect(component.queryByText('Class 1')).toBeNull();
    expect(component.getByText('Class 2')).toBeTruthy();
    expect(component.queryByText('Shared Note 1')).toBeNull();
    expect(component.queryByText('Shared Note 2')).toBeNull();
  });

  it('should display "No results found." when the search term does not match any classes or shared notes', () => {
    fireEvent.change(component.getByPlaceholderText('Search...'), {
      target: { value: 'Class 3' },
    });
    expect(component.queryByText('Class 1')).toBeNull();
    expect(component.queryByText('Class 2')).toBeNull();
    expect(component.queryByText('Shared Note 1')).toBeNull();
    expect(component.queryByText('Shared Note 2')).toBeNull();
    expect(component.getByText('No results found.')).toBeTruthy();
  });
});
