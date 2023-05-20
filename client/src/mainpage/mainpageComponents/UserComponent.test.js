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

  it("handles user click", () => {
    render(<UserComponent noteData={fakeNoteData} />);

    // Simulate click on a user button
    expect(screen.getByRole("button", { name: "bird" })).toBeInTheDocument();
    fireEvent.click(screen.getByText("bird"));

    // Simulate click on delete button
    expect(
      screen.getByRole("button", { name: "Remove User" })
    ).toBeInTheDocument();

    //click on button again else to close the delete button
    fireEvent.click(screen.getByText("bird"));

    expect(screen.queryByText("Remove User")).not.toBeInTheDocument();
    //click on button again to check if remove user closes
  });

  it("handles Remove user click", () => {
    render(<UserComponent noteData={fakeNoteData} />);
  const mockConsoleLog = jest.spyOn(console, "log");

    // Simulate click on a user button
    expect(screen.getByRole("button", { name: "bird" })).toBeInTheDocument();
    fireEvent.click(screen.getByText("bird"));

    // Simulate click on delete button
    expect(
      screen.getByRole("button", { name: "Remove User" })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Remove User" }));
    //check if funciton calsled

    //check if delete console is logged
    expect(mockConsoleLog).toHaveBeenCalledWith("Deleting user:","67890");

    expect(screen.queryByText("Remove User")).not.toBeInTheDocument();
  });
});
