import { render, fireEvent } from '@testing-library/react';
import SideNav from './SideNav';

describe('SideNav', () => {
  const mockData = {
    filteredClasses: [
      {
        id: 1,
        name: 'Class 1',
        notes: [
          {
            id: 101,
            title: 'Note 1',
            content: 'This is Note 1'
          }
        ]
      }
    ],
    data: {
      sharedNotes: []
    },
    handleNewClass: jest.fn(),
    handleSearch: jest.fn(),
    handleNewNote: jest.fn(),
    handleSelectClass: jest.fn(),
    handleSelectShareNote: jest.fn(),
    handleClassNameChange: jest.fn(),
    handleFinishClassNameChange: jest.fn(),
    handleNoteTitleChange: jest.fn(),
    handleFinishNoteTitleChange: jest.fn(),
    isClassButtonActive: jest.fn(),
    isNoteButtonActive: jest.fn(),
    isSelectNoteButtonActive: jest.fn(),
    isClassOpen: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<SideNav {...mockData} />);
  });

  it('renders the correct number of classes and notes', () => {
    const { getAllByRole } = render(<SideNav {...mockData} />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(3); // Depends on the number of buttons in your component
  });

  it('triggers correct function when class button is clicked', () => {
    const { getByText } = render(<SideNav {...mockData} />);
    const button = getByText('Class 1');
    fireEvent.click(button);
    expect(mockData.handleSelectClass).toHaveBeenCalledWith(1);
  });

  it('triggers correct function when new note button is clicked', () => {
    const { getByText } = render(<SideNav {...mockData} />);
    const button = getByText('+ new Note');
    fireEvent.click(button);
    expect(mockData.handleNewNote).toHaveBeenCalledWith(1);
  });
  
});
