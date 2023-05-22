import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the jest-dom matchers
import Profile from "./Profile";

describe("Profile", () => {
  const fakeUserData = {
    uid: "12345",
    name: "test",
    email:"test@test.com",
  };

  it("renders the Profile Data", () => {
    render(<Profile userData={fakeUserData} />);

    //check if name is rendered
    expect(screen.getByText("test")).toBeInTheDocument();
    //check if uid is rendered
    expect(screen.getByText("12345")).toBeInTheDocument();
    
  });
  it("renders the sidebar with settings option", () => {
    //check if settings button is rendered
    render(<Profile userData={fakeUserData} />);
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    //check if profile button is rendered
    expect(screen.getByRole("button", { name: "Profile" })).toBeInTheDocument();
  });
});
