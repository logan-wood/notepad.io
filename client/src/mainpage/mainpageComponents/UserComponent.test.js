import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the jest-dom matchers
import UserComponent from "./UserComponent";

describe("UserComponent", () => {
  const fakeNoteData = {
    owner: "12345",
    users: {
      12345: ["Rilakuma"],
      12325: ["Korilakuma"],
      67890: ["bird"],
    },
  };

  it("renders user buttons", () => {
    render(<UserComponent noteData={fakeNoteData} />);

    // Check if owner button is rendered
    expect(screen.getByRole("button", { name: "12345" })).toBeInTheDocument();

    // Check if user buttons are rendered
    expect(
      screen.getByRole("button", { name: "Korilakuma" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "bird" })).toBeInTheDocument();
  });

  it("handles delete user click", () => {
    render(<UserComponent noteData={fakeNoteData} />);

    // Simulate click on a user button
    expect(screen.getByRole("button", { name: "bird" })).toBeInTheDocument();

    // Simulate click on delete button
    fireEvent.click(screen.getByText("Delete User"));
  });
});
