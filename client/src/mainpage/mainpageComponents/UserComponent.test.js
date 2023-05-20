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

    //check if delete button is not rendered
  });

  it("handles delete user click", () => {
    render(<UserComponent noteData={fakeNoteData} />);

    // Simulate click on a user button
    expect(screen.getByRole("button", { name: "bird" })).toBeInTheDocument();
    fireEvent.click(screen.getByText("bird"));

    // Simulate click on delete button
    expect(
      screen.getByRole("button", { name: "Delete User" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Delete User" }));

    //click on button again else to close the delete button
    fireEvent.click(screen.getByRole("button", { name: "bird" }));
       expect(screen.queryByText("Delete User")).not.toBeInTheDocument();

  });
});
