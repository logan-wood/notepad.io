/** Header Testing */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("Header component", () => {
  // tests the app title being shown
  it("renders the app title", () => {
    render(<Header />);
    expect(screen.getByText("Notepad.io")).toBeInTheDocument();
  });

  // tests the log in button being shown
  it("renders the login button if showButtons is true", () => {
    render(<Header showButtons={true} />);
    expect(screen.getByText("log in")).toBeInTheDocument();
  });

  it("does not render the login button if showButtons is false", () => {
    render(<Header showButtons={false} />);
    expect(screen.queryByText("log in")).not.toBeInTheDocument();
  });

  // tests the sign up button being shown
  it("renders the signup button if showButtons is true", () => {
    render(<Header showButtons={true} />);
    expect(screen.getByText("sign up")).toBeInTheDocument();
  });

  it("does not render the sign up button if showButtons is false", () => {
    render(<Header showButtons={false} />);
    expect(screen.queryByText("sign up")).not.toBeInTheDocument();
  });
});
