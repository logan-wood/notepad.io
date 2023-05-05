/** Header Testing */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header component", () => {
  // tests the app title being shown
  it("renders the app title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Notepad.io")).toBeInTheDocument();
  });

  // tests the log in button being shown
  it("renders the login button if showButtons is true", () => {
    render(
      <MemoryRouter>
        <Header showButtons={true} />
      </MemoryRouter>
    );
    expect(screen.getByText("Log in")).toBeInTheDocument();
  });

  it("does not render the login button if showButtons is false", () => {
    render(
      <MemoryRouter>
        <Header showButtons={false} />
      </MemoryRouter>
    );
    expect(screen.queryByText("Log in")).not.toBeInTheDocument();
  });

  // tests the sign up button being shown
  it("renders the signup button if showButtons is true", () => {
    render(
      <MemoryRouter>
        <Header showButtons={true} />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("does not render the sign up button if showButtons is false", () => {
    render(
      <MemoryRouter>
        <Header showButtons={false} />
      </MemoryRouter>
    );
    expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
  });
});
