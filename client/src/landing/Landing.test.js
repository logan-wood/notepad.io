import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainContent from "./Landing";

describe("MainContent component", () => {
    it("renders the title", () => {
        render(<MainContent />);
        const allTitleElements = screen.getAllByText("Notepad.io");
        const titleElement = allTitleElements.find((element) => element.classList.contains("title"));
        expect(titleElement).toBeInTheDocument();
      });

  it("renders the 'Get notey!' button", () => {
    render(<MainContent />);
    expect(screen.getByText("Get notey!")).toBeInTheDocument();
  });
});
