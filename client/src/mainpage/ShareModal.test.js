import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShareModal from "./ShareModal";
import "@testing-library/jest-dom/extend-expect";

test("renders ShareModal and calls handleExit when 'x' button is clicked", () => {
  // onClose function
  const onClose = jest.fn();

  // Render GameModal component
  render(<ShareModal onClose={onClose} isOpen={true} />);

  // Check that the modal is rendered
  const modalElement = screen.getByTestId("modal");
  expect(modalElement).toBeInTheDocument();

  // click on the 'Exit Game' button
  const exitButton = screen.getByText("x");
  fireEvent.click(exitButton);

  // Assert that the handleExit function is called
  expect(onClose).toHaveBeenCalled();
});

test("clicking email button opens  email  with correct subject and body", () => {
  // onClose function
  const onClose = jest.fn();

  //  mock for window.location.href
  delete window.location;
  window.location = { href: "" };

  // Render ShareModal component
  render(<ShareModal onClose={onClose} isOpen={true} />);

  // check that the modal is rendered
  const modalElement = screen.getByTestId("modal");
  expect(modalElement).toBeInTheDocument();

  // Get the email button
  const emailButton = screen.getByText("✉");

  //  click on the email button
  fireEvent.click(emailButton);

  // Check that the window.location.href method was called with the correct URL
  expect(window.location.href).toBe("mailto:?subject=I%20want%20to%20share%20a%20Note%20with%20you!%20Notepad.io&body=Click%20on%20this%20link!%20https%3A%2F%2Fnotepad.io%2Fsharelink%2Fsdkfjhsdkjf");
});

test("Testing that the link is pasted to users clipboard", () => {
  // onClose function
  const onClose = jest.fn();

  // Create  window.location.href
  delete window.location;
  window.location = { href: "" };

  // Render  ShareModal component
  render(<ShareModal onClose={onClose} isOpen={true} />);
  
  // Mock the clipboard API
    const clipBoardMock = jest.fn();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: clipBoardMock },
      writable: true,
    });

  // Assert that the modal is rendered
  const modalElement = screen.getByTestId("modal");
  expect(modalElement).toBeInTheDocument();

  // Get the copy button
  const copyButton = screen.getByText("📃");

  //click on the email button
  fireEvent.click(copyButton);

  // check that the window.location.href method is called with the  URL
  const expectedLink = "https://notepad.io/sharelink/sdkfjhsdkjf";
  expect(clipBoardMock).toHaveBeenCalledWith(expectedLink);
});

test("Testing that the link is pasted to users clipboard", () => {
  // onClose function
  const onClose = jest.fn();

  // Create  window.location.href
  delete window.location;
  window.location = { href: "" };

  // Render  ShareModal component
  render(<ShareModal onClose={onClose} isOpen={true} />);

  // Mock the clipboard API
  const clipBoardMock = jest.fn();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: clipBoardMock },
    writable: true,
  });

  // Assert that the modal is rendered
  const modalElement = screen.getByTestId("modal");
  expect(modalElement).toBeInTheDocument();

  // Get the copy button
  const copyButton = screen.getByText("📃");

  //click on the email button
  fireEvent.click(copyButton);

  // check that the window.location.href method is called with the  URL
  const expectedLink = "https://notepad.io/sharelink/sdkfjhsdkjf";
  expect(clipBoardMock).toHaveBeenCalledWith(expectedLink);
});


test("renders ShareModal does not close when the sharemodal is clicked", () => {
  // onClose function
  const onClose = jest.fn();

  // Render GameModal component
  render(<ShareModal onClose={onClose} isOpen={true} />);

  // Check that the modal is rendered
  const modalElement = screen.getByTestId("modal");
  expect(modalElement).toBeInTheDocument();

  // click within the modal
  fireEvent.click(modalElement);

  // onClose function is not called
  expect(onClose).not.toHaveBeenCalled();
});