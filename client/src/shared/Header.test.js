import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";

describe("Header component", () => {
  it("renders the app title", () => {
    render(<Header />);
    expect(screen.getByText("Notepad.io")).toBeInTheDocument();
  });

  it("renders the signup/login button if showButton is true", () => {
    render(<Header showButton={true} />);
    expect(screen.getByText("log in / signup")).toBeInTheDocument();
  });

  it("does not render the signup/login button if showButton is false", () => {
    render(<Header showButton={false} />);
    expect(screen.queryByText("log in / signup")).not.toBeInTheDocument();
  });
});
